import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import api from '@/lib/api';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, FileText, Loader2 } from 'lucide-react';

interface Answer {
  qid: string;
  question?: string;
  answer: string;
  score: number;
}

interface CandidateDetail {
  id: string;
  name: string;
  email?: string;
  answers: Answer[];
  summary: string;
  totalTime: string;
  totalScore?: number;
}

const CandidateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<CandidateDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCandidateDetail();
  }, [id]);

  const fetchCandidateDetail = async () => {
    try {
      const response = await api.get(`/interviewer/candidate/${id}`);
      setCandidate(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch candidate details');
      navigate('/interviewer/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-secondary';
    if (score >= 60) return 'text-primary';
    return 'text-destructive';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading candidate details...</p>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/interviewer/dashboard')}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{candidate.name}</h1>
              {candidate.email && (
                <p className="text-muted-foreground">{candidate.email}</p>
              )}
            </div>
            <div className="text-right">
              <div className={`text-4xl font-bold ${getScoreColor(candidate.totalScore || 0)}`}>
                {candidate.totalScore || 0}%
              </div>
              <p className="text-sm text-muted-foreground">Overall Score</p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6">
          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{candidate.summary}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Total Time: {candidate.totalTime}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Answers */}
          {candidate.answers.map((answer, index) => (
            <motion.div
              key={answer.qid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 2) }}
            >
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">
                      Question {index + 1}
                      {answer.question && (
                        <span className="block text-sm font-normal text-muted-foreground mt-1">
                          {answer.question}
                        </span>
                      )}
                    </CardTitle>
                    <Badge
                      className={
                        answer.score >= 80
                          ? 'bg-secondary text-secondary-foreground'
                          : answer.score >= 60
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-destructive text-destructive-foreground'
                      }
                    >
                      {answer.score}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Candidate's Answer:
                    </p>
                    <p className="text-foreground whitespace-pre-wrap">{answer.answer}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateDetail;
