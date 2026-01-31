import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { auth } from '../lib/firebase';

export default function Activities() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        router.push('/login');
        return;
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const categories = [
    {
      name: 'Bible Stories',
      icon: '📖',
      color: '#4A90E2',
      description: 'Interactive stories from Scripture',
      activities: [
        { id: 1, title: 'The Good Samaritan', duration: '10 min', difficulty: 'Easy' },
        { id: 2, title: 'Noah\'s Ark', duration: '12 min', difficulty: 'Easy' },
        { id: 3, title: 'David and Goliath', duration: '15 min', difficulty: 'Medium' },
        { id: 4, title: 'Daniel in the Lion\'s Den', duration: '10 min', difficulty: 'Easy' },
        { id: 5, title: 'The Prodigal Son', duration: '12 min', difficulty: 'Medium' },
        { id: 6, title: 'The Ten Commandments', duration: '15 min', difficulty: 'Medium' },
        { id: 7, title: 'Jonah and the Whale', duration: '10 min', difficulty: 'Easy' },
        { id: 8, title: 'The Birth of Jesus', duration: '12 min', difficulty: 'Easy' },
        { id: 9, title: 'Jesus Calms the Storm', duration: '10 min', difficulty: 'Easy' },
        { id: 10, title: 'The Feeding of 5000', duration: '12 min', difficulty: 'Medium' },
        { id: 11, title: 'Zacchaeus', duration: '8 min', difficulty: 'Easy' },
        { id: 12, title: 'The Lost Sheep', duration: '10 min', difficulty: 'Easy' },
        { id: 13, title: 'Moses and the Red Sea', duration: '15 min', difficulty: 'Medium' },
        { id: 14, title: 'Creation Story', duration: '12 min', difficulty: 'Easy' },
        { id: 15, title: 'Adam and Eve', duration: '10 min', difficulty: 'Easy' },
        { id: 16, title: 'Joseph\'s Coat', duration: '12 min', difficulty: 'Medium' },
        { id: 17, title: 'The Easter Story', duration: '15 min', difficulty: 'Medium' },
        { id: 18, title: 'Jesus Heals the Blind', duration: '10 min', difficulty: 'Easy' },
        { id: 19, title: 'The Wise Men', duration: '10 min', difficulty: 'Easy' },
        { id: 20, title: 'Ruth and Naomi', duration: '12 min', difficulty: 'Medium' },
        { id: 21, title: 'Esther Saves Her People', duration: '15 min', difficulty: 'Medium' },
        { id: 22, title: 'Joshua and Jericho', duration: '12 min', difficulty: 'Medium' },
        { id: 23, title: 'Gideon\'s Army', duration: '10 min', difficulty: 'Medium' },
        { id: 24, title: 'Samson and Delilah', duration: '12 min', difficulty: 'Medium' },
        { id: 25, title: 'The Good Shepherd', duration: '8 min', difficulty: 'Easy' },
        { id: 26, title: 'Jesus Walks on Water', duration: '10 min', difficulty: 'Easy' },
        { id: 27, title: 'The Resurrection', duration: '15 min', difficulty: 'Medium' },
        { id: 28, title: 'Paul\'s Conversion', duration: '12 min', difficulty: 'Medium' },
        { id: 29, title: 'Peter Walks on Water', duration: '10 min', difficulty: 'Easy' },
        { id: 30, title: 'The Sermon on the Mount', duration: '15 min', difficulty: 'Medium' },
        { id: 31, title: 'Mary and Martha', duration: '10 min', difficulty: 'Easy' },
        { id: 32, title: 'The Transfiguration', duration: '12 min', difficulty: 'Medium' },
        { id: 33, title: 'The Last Supper', duration: '15 min', difficulty: 'Medium' },
        { id: 34, title: 'Jesus in the Garden', duration: '12 min', difficulty: 'Medium' },
        { id: 35, title: 'The Road to Emmaus', duration: '15 min', difficulty: 'Medium' },
        { id: 36, title: 'Pentecost', duration: '12 min', difficulty: 'Medium' },
        { id: 37, title: 'The Tower of Babel', duration: '10 min', difficulty: 'Easy' },
        { id: 38, title: 'Abraham and Isaac', duration: '15 min', difficulty: 'Medium' },
        { id: 39, title: 'Jacob\'s Ladder', duration: '10 min', difficulty: 'Easy' },
        { id: 40, title: 'The Burning Bush', duration: '12 min', difficulty: 'Medium' },
        { id: 41, title: 'Elijah and the Ravens', duration: '10 min', difficulty: 'Easy' },
        { id: 42, title: 'The Fiery Furnace', duration: '12 min', difficulty: 'Medium' },
        { id: 43, title: 'Jesus Blesses Children', duration: '8 min', difficulty: 'Easy' },
        { id: 44, title: 'The Armor of God', duration: '15 min', difficulty: 'Medium' },
        { id: 45, title: 'The Fruit of the Spirit', duration: '12 min', difficulty: 'Medium' }
      ]
    },
    {
      name: 'Memory Verses',
      icon: '✝️',
      color: '#9B87D4',
      description: 'Learn Scripture by heart',
      activities: Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        title: `Memory Verse ${i + 1}`,
        duration: '5 min',
        difficulty: i % 3 === 0 ? 'Easy' : i % 3 === 1 ? 'Medium' : 'Hard'
      }))
    },
    {
      name: 'Prayer Time',
      icon: '🙏',
      color: '#66CC99',
      description: 'Guided prayers and quiet time',
      activities: Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        title: `Prayer Activity ${i + 1}`,
        duration: '8 min',
        difficulty: 'Easy'
      }))
    },
    {
      name: 'Worship Songs',
      icon: '🎵',
      color: '#FFB399',
      description: 'Sing praises to God',
      activities: Array.from({ length: 40 }, (_, i) => ({
        id: i + 1,
        title: `Worship Song ${i + 1}`,
        duration: '4 min',
        difficulty: 'Easy'
      }))
    },
    {
      name: 'Meditation',
      icon: '🕊️',
      color: '#5CB85C',
      description: 'Peaceful reflection on God\'s word',
      activities: Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        title: `Meditation ${i + 1}`,
        duration: '10 min',
        difficulty: i % 2 === 0 ? 'Easy' : 'Medium'
      }))
    },
    {
      name: 'Art & Creativity',
      icon: '🎨',
      color: '#F0AD4E',
      description: 'Create faith-inspired artwork',
      activities: Array.from({ length: 35 }, (_, i) => ({
        id: i + 1,
        title: `Art Project ${i + 1}`,
        duration: '15 min',
        difficulty: i % 3 === 0 ? 'Easy' : 'Medium'
      }))
    },
    {
      name: 'Nature Exploration',
      icon: '🌿',
      color: '#5BC0DE',
      description: 'Discover God\'s creation',
      activities: Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        title: `Nature Activity ${i + 1}`,
        duration: '12 min',
        difficulty: 'Easy'
      }))
    },
    {
      name: 'Kindness Activities',
      icon: '💝',
      color: '#D9534F',
      description: 'Practice love and compassion',
      activities: Array.from({ length: 28 }, (_, i) => ({
        id: i + 1,
        title: `Kindness Project ${i + 1}`,
        duration: '10 min',
        difficulty: 'Easy'
      }))
    },
    {
      name: 'Music & Rhythm',
      icon: '🎹',
      color: '#FF9D7F',
      description: 'Musical activities and instruments',
      activities: Array.from({ length: 32 }, (_, i) => ({
        id: i + 1,
        title: `Music Activity ${i + 1}`,
        duration: '8 min',
        difficulty: i % 2 === 0 ? 'Easy' : 'Medium'
      }))
    },
    {
      name: 'Breathing Exercises',
      icon: '🌬️',
      color: '#66CC99',
      description: 'Calm breathing techniques',
      activities: Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        title: `Breathing Exercise ${i + 1}`,
        duration: '5 min',
        difficulty: 'Easy'
      }))
    },
    {
      name: 'Story Creation',
      icon: '📝',
      color: '#FFD966',
      description: 'Write your own faith stories',
      activities: Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        title: `Story Writing ${i + 1}`,
        duration: '15 min',
        difficulty: 'Medium'
      }))
    },
    {
      name: 'Movement & Dance',
      icon: '💃',
      color: '#9B87D4',
      description: 'Praise God through movement',
      activities: Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        title: `Movement Activity ${i + 1}`,
        duration: '10 min',
        difficulty: 'Easy'
      }))
    },
    {
      name: 'Gratitude Journal',
      icon: '📔',
      color: '#4A90E2',
      description: 'Practice thankfulness',
      activities: Array.from({ length: 22 }, (_, i) => ({
        id: i + 1,
        title: `Gratitude Prompt ${i + 1}`,
        duration: '8 min',
        difficulty: 'Easy'
      }))
    },
    {
      name: 'Sensory Activities',
      icon: '✨',
      color: '#FFB399',
      description: 'Multi-sensory faith experiences',
      activities: Array.from({ length: 33 }, (_, i) => ({
        id: i + 1,
        title: `Sensory Activity ${i + 1}`,
        duration: '12 min',
        difficulty: i % 2 === 0 ? 'Easy' : 'Medium'
      }))
    },
    {
      name: 'Social Skills',
      icon: '👥',
      color: '#5CB85C',
      description: 'Build relationships God\'s way',
      activities: Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        title: `Social Skills ${i + 1}`,
        duration: '10 min',
        difficulty: i % 3 === 0 ? 'Easy' : 'Medium'
      }))
    }
  ];

  const filteredCategories = searchTerm
    ? categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categories;

  const handleActivityClick = (category, activity) => {
    // For now, just show an alert. You can later create individual activity pages
    alert(`Starting: ${activity.title} from ${category.name}\nDuration: ${activity.duration}\nDifficulty: ${activity.difficulty}`);
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading activities...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Activities - PeacePath Kids</title>
        <meta name="description" content="Explore 475 faith-based activities for special needs children" />
      </Head>

      <div style={styles.container}>
        {/* Header */}
        <nav style={styles.nav}>
          <div style={styles.navBrand}>
            <span style={styles.navLogo}>🕊️💝✝️</span>
            <span style={styles.navTitle}>PeacePath Kids</span>
          </div>
          <div style={styles.navLinks}>
            <button onClick={() => router.push('/dashboard')} style={styles.navLink}>
              Dashboard
            </button>
            <button onClick={() => router.push('/welcome')} style={styles.navLink}>
              Help
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <div style={styles.mainContent}>
          <div style={styles.header}>
            <h1 style={styles.title}>Explore Activities</h1>
            <p style={styles.subtitle}>475 faith-based activities designed for special needs children</p>
          </div>

          {/* Search Bar */}
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          {/* Category View or Activity List */}
          {selectedCategory ? (
            // Activity List View
            <div>
              <button
                onClick={() => setSelectedCategory(null)}
                style={styles.backButton}
              >
                ← Back to Categories
              </button>
              
              <div style={styles.categoryHeader}>
                <div style={styles.categoryHeaderIcon}>{selectedCategory.icon}</div>
                <div>
                  <h2 style={styles.categoryHeaderTitle}>{selectedCategory.name}</h2>
                  <p style={styles.categoryHeaderDesc}>{selectedCategory.description}</p>
                  <p style={styles.categoryHeaderCount}>
                    {selectedCategory.activities.length} activities
                  </p>
                </div>
              </div>

              <div style={styles.activitiesGrid}>
                {selectedCategory.activities.map((activity) => (
                  <div
                    key={activity.id}
                    style={styles.activityCard}
                    onClick={() => handleActivityClick(selectedCategory, activity)}
                  >
                    <div style={styles.activityHeader}>
                      <h3 style={styles.activityTitle}>{activity.title}</h3>
                      <span style={{
                        ...styles.difficultyBadge,
                        backgroundColor: 
                          activity.difficulty === 'Easy' ? '#5CB85C' :
                          activity.difficulty === 'Medium' ? '#F0AD4E' :
                          '#D9534F'
                      }}>
                        {activity.difficulty}
                      </span>
                    </div>
                    <div style={styles.activityMeta}>
                      <span style={styles.activityDuration}>⏱️ {activity.duration}</span>
                      <button style={styles.startButton}>Start →</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Categories Grid View
            <div style={styles.categoriesGrid}>
              {filteredCategories.map((category, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.categoryCard,
                    backgroundColor: category.color
                  }}
                  onClick={() => setSelectedCategory(category)}
                >
                  <div style={styles.categoryIcon}>{category.icon}</div>
                  <h3 style={styles.categoryName}>{category.name}</h3>
                  <p style={styles.categoryDescription}>{category.description}</p>
                  <p style={styles.categoryCount}>
                    {category.activities.length} activities
                  </p>
                  <button style={styles.exploreButton}>Explore →</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F5F7FA'
  },
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F7FA'
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #E1E8ED',
    borderTop: '5px solid #4A90E2',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px'
  },
  nav: {
    backgroundColor: 'white',
    padding: '16px 24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },
  navBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  navLogo: {
    fontSize: '1.8rem'
  },
  navTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#4A90E2'
  },
  navLinks: {
    display: 'flex',
    gap: '16px'
  },
  navLink: {
    background: 'none',
    border: 'none',
    padding: '8px 16px',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#657786',
    cursor: 'pointer',
    transition: 'color 0.3s ease'
  },
  mainContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '40px 24px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  title: {
    fontSize: '3rem',
    fontWeight: '700',
    color: '#14171A',
    marginBottom: '12px'
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#657786'
  },
  searchContainer: {
    maxWidth: '600px',
    margin: '0 auto 40px'
  },
  searchInput: {
    width: '100%',
    padding: '16px 24px',
    fontSize: '1.1rem',
    border: '2px solid #E1E8ED',
    borderRadius: '50px',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px'
  },
  categoryCard: {
    padding: '32px',
    borderRadius: '24px',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  categoryIcon: {
    fontSize: '4rem',
    marginBottom: '16px'
  },
  categoryName: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '12px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
  },
  categoryDescription: {
    fontSize: '1rem',
    marginBottom: '12px',
    opacity: 0.95
  },
  categoryCount: {
    fontSize: '0.95rem',
    marginBottom: '20px',
    opacity: 0.9
  },
  exploreButton: {
    padding: '12px 32px',
    fontSize: '1rem',
    fontWeight: '700',
    backgroundColor: 'white',
    color: '#14171A',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  backButton: {
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: '600',
    backgroundColor: 'white',
    color: '#4A90E2',
    border: '2px solid #4A90E2',
    borderRadius: '12px',
    cursor: 'pointer',
    marginBottom: '24px'
  },
  categoryHeader: {
    backgroundColor: 'white',
    padding: '32px',
    borderRadius: '24px',
    marginBottom: '32px',
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
  },
  categoryHeaderIcon: {
    fontSize: '5rem'
  },
  categoryHeaderTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#14171A',
    marginBottom: '8px'
  },
  categoryHeaderDesc: {
    fontSize: '1.2rem',
    color: '#657786',
    marginBottom: '8px'
  },
  categoryHeaderCount: {
    fontSize: '1rem',
    color: '#4A90E2',
    fontWeight: '600'
  },
  activitiesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px'
  },
  activityCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '2px solid transparent'
  },
  activityHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: '16px'
  },
  activityTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#14171A',
    flex: 1,
    marginRight: '12px'
  },
  difficultyBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'white'
  },
  activityMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  activityDuration: {
    fontSize: '0.95rem',
    color: '#657786'
  },
  startButton: {
    padding: '8px 20px',
    fontSize: '0.95rem',
    fontWeight: '700',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer'
  }
};
