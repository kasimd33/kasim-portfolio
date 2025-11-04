import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore'
import { db } from './firebase'

export interface ContactSubmission {
  name: string
  email: string
  subject: string
  message: string
  timestamp: Timestamp
  status: 'pending' | 'read' | 'replied'
}

// Submit contact form
export const submitContactForm = async (data: Omit<ContactSubmission, 'timestamp' | 'status'>) => {
  try {
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return { success: false, error: 'Missing required fields' }
    }

    const docRef = await addDoc(collection(db, 'contacts'), {
      ...data,
      timestamp: Timestamp.now(),
      status: 'pending'
    })
    
    console.log('Contact form submitted successfully:', docRef.id)
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to submit form' }
  }
}

// Get all contact submissions (admin only)
export const getContactSubmissions = async () => {
  try {
    const q = query(collection(db, 'contacts'), orderBy('timestamp', 'desc'))
    const querySnapshot = await getDocs(q)
    const submissions: (ContactSubmission & { id: string })[] = []
    
    querySnapshot.forEach((doc) => {
      submissions.push({ id: doc.id, ...doc.data() } as ContactSubmission & { id: string })
    })
    
    return { success: true, data: submissions }
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return { success: false, error: 'Failed to fetch contacts' }
  }
}