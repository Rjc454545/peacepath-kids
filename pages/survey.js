import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { auth, db } from '../lib/firebase';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { generateUserCode, sanitizeInput } from '../utils/helpers';

export default function Survey() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [userCode, setUserCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Child Information
    childName: '',
    childAge: '',
    childGender: '',
    specialNeeds: [],
    otherSpecialNeed: '',
    
    // Step 2: Communication & Sensory
    communicationLevel: '',
    verbalAbility: '',
    sensoryPreferences: [],
    sensoryDislikes: [],
    
    // Step 3: Physical & Motor
    motorSkills: '',
    mobilityAids: '',
    physicalLimitations: [],
    
    // Step 4: Learning & Social
    learningStyle: [],
    attentionSpan: '',
    socialComfort: '',
    groupPreference: '',
    
    // Step 5: Spiritual & Goals
    spiritualBackground: '',
    churchAttendance: '',
    bibleKnowledge: '',
    parentGoals: [],
    otherGoal: '',
    activityPreferences: []
  });

  useEffect(() => {
    // Check if user is authenticated
    const user = auth.currentUser;
    if (!user) {
      router.push('/login');
      return;
    }
    
    // Generate user code
    const code = generateUserCode();
    setUserCode(code);
  }, [router]);

  const specialNeedsOptions = [
    'Autism Spectrum Disorder (ASD)',
    'ADHD',
    'Sensory Processing Disorder',
    'Anxiety Disorder',
    'Learning Disability',
    'Speech/Language Delay',
    'Physical Disability',
    'Visual Impairment',
    'Hearing Impairment',
    'Down Syndrome',
    'Cerebral Palsy',
    'Other'
  ];

  const sensoryPreferencesOptions = [
    'Visual (pictures, videos)',
    'Auditory (music, sounds)',
    'Tactile (touch, textures)',
    'Movement (dancing, physical activity)',
    'Quiet environments',
    'Soft lighting',
    'Repetition and routine'
  ];

  const sensoryDislikesOptions = [
    'Loud noises',
    'Bright lights',
    'Crowded spaces',
    'Unexpected changes',
    'Strong smells',
    'Certain textures',
    'Fast movements'
  ];

  const physicalLimitationsOptions = [
    'Limited fine motor skills',
    'Limited gross motor skills',
    'Difficulty sitting still',
    'Needs movement breaks',
    'Uses wheelchair/walker',
    'Vision limitations',
    'Hearing limitations',
    'None'
  ];

  const learningStyleOptions = [
    'Visual learner',
    'Auditory learner',
    'Kinesthetic learner',
    'Needs repetition',
    'Learns best one-on-one',
    'Benefits from peer interaction',
    'Prefers structured activities',
    'Prefers creative freedom'
  ];

  const parentGoalsOptions = [
    'Scripture memorization',
    'Strengthen faith foundation',
    'Develop social skills',
    'Improve focus and attention',
    'Build self-regulation',
    'Encourage creative expression',
    'Practice gratitude and kindness',
    'Reduce anxiety through faith',
    'Develop prayer habits',
    'Improve motor skills',
    'Build confidence',
    'Other'
  ];

  const activityPreferencesOptions = [
    'Bible Stories',
    'Memory Verses',
    'Prayer Activities',
    'Worship Songs',
    'Art & Creativity',
    'Music & Rhythm',
    'Movement & Dance',
    'Nature Exploration',
    'Meditation & Breathing',
    'Journaling',
    'Social Skills Activities',
    'Sensory Activities',
    'Story Creation',
    'Kindness Projects'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const arrayField = formData[name] || [];
      if (checked) {
        setFormData(prev => ({
          ...prev,
          [name]: [...arrayField, value]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: arrayField.filter(item => item !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateStep = (step) => {
    switch(step) {
      case 1:
        return formData.childName && formData.childAge && formData.childGender && formData.specialNeeds.length > 0;
      case 2:
        return formData.communicationLevel && formData.verbalAbility && formData.sensoryPreferences.length > 0;
      case 3:
        return formData.motorSkills && formData.physicalLimitations.length > 0;
      case 4:
        return formData.learningStyle.length > 0 && formData.attentionSpan && formData.socialComfort;
      case 5:
        return formData.spiritualBackground && formData.parentGoals.length > 0 && formData.activityPreferences.length > 0;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
      window.scrollTo(0, 0);
    } else {
      alert('Please complete all required fields before continuing');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(5)) {
      alert('Please complete all required fields');
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        router.push('/login');
        return;
      }

      // Save survey response
      await addDoc(collection(db, 'surveys'), {
        userId: user.uid,
        userCode: userCode,
        ...formData,
        submittedAt: new Date().toISOString()
      });

      // Create child profile
      const childRef = collection(db, 'users', user.uid, 'children');
      await addDoc(childRef, {
        name: sanitizeInput(formData.childName),
        age: parseInt(formData.childAge),
        gender: formData.childGender,
        specialNeeds: formData.specialNeeds,
        createdAt: new Date().toISOString(),
        userCode: userCode
      });

      // Update user document with survey completion
      await setDoc(doc(db, 'users', user.uid), {
        surveyCompleted: true,
        userCode: userCode,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      // Redirect to dashboard
      router.push('/dashboard');

    } catch (error) {
      console.error('Survey submission error:', error);
      alert('Failed to save survey. Please try again.');
      setLoading(false);
    }
  };

  const renderProgressBar = () => (
    <div style={styles.progressContainer}>
      <div style={styles.progressBar}>
        <div style={{
          ...styles.progressFill,
          width: `${(currentStep / 5) * 100}%`
        }} />
      </div>
      <p style={styles.progressText}>
        Step {currentStep} of 5
      </p>
    </div>
  );

  const renderStep1 = () => (
    <div style={styles.stepContainer}>
      <h2 style={styles.stepTitle}>Tell Us About Your Child</h2>
      <p style={styles.stepDescription}>
        This information helps us personalize activities for your child's unique needs and abilities.
      </p>

      <div style={styles.formGroup}>
        <label style={styles.label}>Child's First Name *</label>
        <input
          type="text"
          name="childName"
          value={formData.childName}
          onChange={handleChange}
          placeholder="Enter child's first name"
          style={styles.input}
          required
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Child's Age *</label>
        <select
          name="childAge"
          value={formData.childAge}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Select age</option>
          {[6,7,8,9,10,11,12,13,14,15,16].map(age => (
            <option key={age} value={age}>{age} years old</option>
          ))}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Gender *</label>
        <div style={styles.radioGroup}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="childGender"
              value="Male"
              checked={formData.childGender === 'Male'}
              onChange={handleChange}
              style={styles.radio}
            />
            <span>Male</span>
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="childGender"
              value="Female"
              checked={formData.childGender === 'Female'}
              onChange={handleChange}
              style={styles.radio}
            />
            <span>Female</span>
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="childGender"
              value="Prefer not to say"
              checked={formData.childGender === 'Prefer not to say'}
              onChange={handleChange}
              style={styles.radio}
            />
            <span>Prefer not to say</span>
          </label>
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Special Needs (select all that apply) *</label>
        <div style={styles.checkboxGrid}>
          {specialNeedsOptions.map(option => (
            <label key={option} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="specialNeeds"
                value={option}
                checked={formData.specialNeeds.includes(option)}
                onChange={handleChange}
                style={styles.checkbox}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {formData.specialNeeds.includes('Other') && (
          <input
            type="text"
            name="otherSpecialNeed"
            value={formData.otherSpecialNeed}
            onChange={handleChange}
            placeholder="Please specify"
            style={{...styles.input, marginTop: '12px'}}
          />
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div style={styles.stepContainer}>
      <h2 style={styles.stepTitle}>Communication & Sensory Profile</h2>
      <p style={styles.stepDescription}>
        Understanding how your child communicates and processes sensory information helps us provide the best experience.
      </p>

      <div style={styles.formGroup}>
        <label style={styles.label}>Communication Level *</label>
        <select
          name="communicationLevel"
          value={formData.communicationLevel}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Select level</option>
          <option value="Non-verbal">Non-verbal</option>
          <option value="Limited verbal">Limited verbal (few words)</option>
          <option value="Conversational">Conversational (sentences)</option>
          <option value="Advanced">Advanced (complex conversations)</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Verbal Ability *</label>
        <select
          name="verbalAbility"
          value={formData.verbalAbility}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Select ability</option>
          <option value="Uses alternative communication (sign language, device)">Uses alternative communication</option>
          <option value="Speaks in single words">Speaks in single words</option>
          <option value="Speaks in short phrases">Speaks in short phrases</option>
          <option value="Speaks in full sentences">Speaks in full sentences</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Sensory Preferences (select all that apply) *</label>
        <div style={styles.checkboxGrid}>
          {sensoryPreferencesOptions.map(option => (
            <label key={option} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="sensoryPreferences"
                value={option}
                checked={formData.sensoryPreferences.includes(option)}
                onChange={handleChange}
                style={styles.checkbox}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Sensory Dislikes (select all that apply)</label>
        <div style={styles.checkboxGrid}>
          {sensoryDislikesOptions.map(option => (
            <label key={option} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="sensoryDislikes"
                value={option}
                checked={formData.sensoryDislikes.includes(option)}
                onChange={handleChange}
                style={styles.checkbox}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div style={styles.stepContainer}>
      <h2 style={styles.stepTitle}>Physical Abilities & Motor Skills</h2>
      <p style={styles.stepDescription}>
        This helps us recommend age-appropriate physical activities and accommodate any limitations.
      </p>

      <div style={styles.formGroup}>
        <label style={styles.label}>Motor Skills Development *</label>
        <select
          name="motorSkills"
          value={formData.motorSkills}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Select level</option>
          <option value="Significantly delayed">Significantly delayed</option>
          <option value="Somewhat delayed">Somewhat delayed</option>
          <option value="Age-appropriate">Age-appropriate</option>
          <option value="Advanced">Advanced for age</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Mobility Aids</label>
        <select
          name="mobilityAids"
          value={formData.mobilityAids}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">None</option>
          <option value="Wheelchair">Wheelchair</option>
          <option value="Walker">Walker</option>
          <option value="Crutches">Crutches</option>
          <option value="Cane">Cane</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Physical Limitations (select all that apply) *</label>
        <div style={styles.checkboxGrid}>
          {physicalLimitationsOptions.map(option => (
            <label key={option} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="physicalLimitations"
                value={option}
                checked={formData.physicalLimitations.includes(option)}
                onChange={handleChange}
                style={styles.checkbox}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div style={styles.stepContainer}>
      <h2 style={styles.stepTitle}>Learning Style & Social Preferences</h2>
      <p style={styles.stepDescription}>
        Understanding how your child learns best helps us recommend the most effective activities.
      </p>

      <div style={styles.formGroup}>
        <label style={styles.label}>Learning Style (select all that apply) *</label>
        <div style={styles.checkboxGrid}>
          {learningStyleOptions.map(option => (
            <label key={option} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="learningStyle"
                value={option}
                checked={formData.learningStyle.includes(option)}
                onChange={handleChange}
                style={styles.checkbox}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Typical Attention Span *</label>
        <select
          name="attentionSpan"
          value={formData.attentionSpan}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Select duration</option>
          <option value="1-5 minutes">1-5 minutes</option>
          <option value="5-10 minutes">5-10 minutes</option>
          <option value="10-15 minutes">10-15 minutes</option>
          <option value="15-20 minutes">15-20 minutes</option>
          <option value="20+ minutes">20+ minutes</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Social Comfort Level *</label>
        <select
          name="socialComfort"
          value={formData.socialComfort}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Select level</option>
          <option value="Prefers solitary activities">Prefers solitary activities</option>
          <option value="Comfortable with familiar people">Comfortable with familiar people</option>
          <option value="Enjoys small groups (2-3 people)">Enjoys small groups</option>
          <option value="Comfortable in larger groups">Comfortable in larger groups</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Group Activity Preference</label>
        <select
          name="groupPreference"
          value={formData.groupPreference}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Select preference</option>
          <option value="Independent activities only">Independent activities only</option>
          <option value="Parallel play (near others but not with)">Parallel play</option>
          <option value="Cooperative activities with support">Cooperative with support</option>
          <option value="Fully cooperative group activities">Fully cooperative</option>
        </select>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div style={styles.stepContainer}>
      <h2 style={styles.stepTitle}>Spiritual Background & Goals</h2>
      <p style={styles.stepDescription}>
        This helps us tailor faith-based content to your family's spiritual journey and goals.
      </p>

      <div style={styles.formGroup}>
        <label style={styles.label}>Spiritual Background *</label>
        <select
          name="spiritualBackground"
          value={formData.spiritualBackground}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Select background</option>
          <option value="New to faith/Christianity">New to faith</option>
          <option value="Familiar with Bible basics">Familiar with basics</option>
          <option value="Regular church attender">Regular church attender</option>
          <option value="Strong faith foundation">Strong faith foundation</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Church Attendance *</label>
        <select
          name="churchAttendance"
          value={formData.churchAttendance}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Select frequency</option>
          <option value="Never">Never</option>
          <option value="Occasionally (holidays)">Occasionally</option>
          <option value="Monthly">Monthly</option>
          <option value="2-3 times per month">2-3 times per month</option>
          <option value="Weekly">Weekly</option>
          <option value="Multiple times per week">Multiple times per week</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Bible Knowledge Level *</label>
        <select
          name="bibleKnowledge"
          value={formData.bibleKnowledge}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Select level</option>
          <option value="No prior knowledge">No prior knowledge</option>
          <option value="Knows a few basic stories">Knows a few stories</option>
          <option value="Familiar with major stories">Familiar with major stories</option>
          <option value="Good understanding of Scripture">Good understanding</option>
          <option value="Advanced Bible knowledge">Advanced knowledge</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Your Goals for Your Child (select all that apply) *</label>
        <div style={styles.checkboxGrid}>
          {parentGoalsOptions.map(option => (
            <label key={option} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="parentGoals"
                value={option}
                checked={formData.parentGoals.includes(option)}
                onChange={handleChange}
                style={styles.checkbox}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {formData.parentGoals.includes('Other') && (
          <input
            type="text"
            name="otherGoal"
            value={formData.otherGoal}
            onChange={handleChange}
            placeholder="Please specify your goal"
            style={{...styles.input, marginTop: '12px'}}
          />
        )}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Activity Preferences (select top 5) *</label>
        <p style={styles.helpText}>
          Choose the types of activities your child would enjoy most
        </p>
        <div style={styles.checkboxGrid}>
          {activityPreferencesOptions.map(option => (
            <label key={option} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="activityPreferences"
                value={option}
                checked={formData.activityPreferences.includes(option)}
                onChange={handleChange}
                style={styles.checkbox}
                disabled={formData.activityPreferences.length >= 5 && !formData.activityPreferences.includes(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <p style={styles.helpText}>
          Selected: {formData.activityPreferences.length} / 5
        </p>
      </div>

      <div style={styles.userCodeDisplay}>
        <h3 style={styles.userCodeTitle}>Your User Code</h3>
        <p style={styles.userCodeText}>
          Save this code for your records. You can use it to reference your account with support.
        </p>
        <div style={styles.userCodeBox}>
          <span style={styles.userCode}>{userCode}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Child Profile Survey - PeacePath Kids</title>
        <meta name="description" content="Complete your child's profile to get personalized activity recommendations" />
      </Head>

      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.header}>
            <div style={styles.logo}>🕊️💝✝️</div>
            <h1 style={styles.title}>Child Profile Survey</h1>
            <p style={styles.subtitle}>
              Help us personalize PeacePath Kids for your child's unique needs
            </p>
          </div>

          {renderProgressBar()}

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}

            <div style={styles.buttonContainer}>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  style={styles.btnSecondary}
                  disabled={loading}
                >
                  ← Previous
                </button>
              )}
              
              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  style={styles.btnPrimary}
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  style={styles.btnPrimary}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Complete Setup'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F5F7FA',
    padding: '40px 20px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '24px',
    padding: '48px',
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  logo: {
    fontSize: '3rem',
    marginBottom: '16px'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#14171A',
    marginBottom: '12px'
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#657786',
    lineHeight: '1.6'
  },
  progressContainer: {
    marginBottom: '40px'
  },
  progressBar: {
    width: '100%',
    height: '12px',
    backgroundColor: '#E1E8ED',
    borderRadius: '6px',
    overflow: 'hidden',
    marginBottom: '8px'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
    transition: 'width 0.5s ease',
    borderRadius: '6px'
  },
  progressText: {
    textAlign: 'center',
    fontSize: '0.95rem',
    color: '#657786',
    fontWeight: '600'
  },
  stepContainer: {
    marginBottom: '32px'
  },
  stepTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#14171A',
    marginBottom: '12px'
  },
  stepDescription: {
    fontSize: '1rem',
    color: '#657786',
    lineHeight: '1.6',
    marginBottom: '32px'
  },
  formGroup: {
    marginBottom: '28px'
  },
  label: {
    display: 'block',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#14171A',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    padding: '14px',
    fontSize: '1rem',
    border: '2px solid #E1E8ED',
    borderRadius: '12px',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s ease'
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    border: '2px solid #E1E8ED',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '1rem'
  },
  radio: {
    width: '20px',
    height: '20px',
    cursor: 'pointer'
  },
  checkboxGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    border: '2px solid #E1E8ED',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '0.95rem'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    minWidth: '18px'
  },
  helpText: {
    fontSize: '0.9rem',
    color: '#657786',
    marginTop: '8px',
    lineHeight: '1.4'
  },
  userCodeDisplay: {
    backgroundColor: '#D9EDF7',
    borderLeft: '4px solid #5BC0DE',
    padding: '24px',
    borderRadius: '12px',
    marginTop: '32px'
  },
  userCodeTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#31708F',
    marginBottom: '8px'
  },
  userCodeText: {
    fontSize: '1rem',
    color: '#31708F',
    marginBottom: '16px',
    lineHeight: '1.5'
  },
  userCodeBox: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center'
  },
  userCode: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#4A90E2',
    letterSpacing: '2px',
    fontFamily: 'monospace'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
    marginTop: '40px'
  },
  btnPrimary: {
    flex: 1,
    padding: '16px 32px',
    fontSize: '1.1rem',
    fontWeight: '700',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  btnSecondary: {
    flex: 1,
    padding: '16px 32px',
    fontSize: '1.1rem',
    fontWeight: '700',
    backgroundColor: '#E1E8ED',
    color: '#14171A',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }
};
