'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Mail, Calendar, User, MessageSquare } from 'lucide-react'
import { getContactSubmissions, type ContactSubmission } from '@/lib/firestore'

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<(ContactSubmission & { id: string })[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    setLoading(true)
    const result = await getContactSubmissions()
    if (result.success) {
      setSubmissions(result.data)
    }
    setLoading(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500'
      case 'read': return 'bg-blue-500'
      case 'replied': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Contact Submissions</h1>
          <p className="text-muted-foreground">Manage contact form submissions</p>
        </div>

        <div className="grid gap-6">
          {submissions.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Mail className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No submissions yet</h3>
                <p className="text-muted-foreground">Contact form submissions will appear here</p>
              </CardContent>
            </Card>
          ) : (
            submissions.map((submission) => (
              <Card key={submission.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      {submission.name}
                    </CardTitle>
                    <Badge className={getStatusColor(submission.status)}>
                      {submission.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {submission.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {submission.timestamp.toDate().toLocaleDateString()}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-1">Subject</h4>
                      <p className="text-muted-foreground">{submission.subject}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        Message
                      </h4>
                      <p className="text-muted-foreground whitespace-pre-wrap">{submission.message}</p>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(`mailto:${submission.email}?subject=Re: ${submission.subject}`)}
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}