import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InterviewQuestionCard from '@/components/InterviewQuestionCard';
import api from '@/lib/api';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Question {
  qid: string;
  question: string;
  timeLimit: number;
}

const Interview = () => {
  const { candidateId } = useParams();
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    startInterview();
  }, [candidateId]);

  const startInterview = async () => {
    try {
      const response = await api.post('/interview/start', { candidateId });
      setSessionId(response.data.sessionId);
      setQuestions(response.data.questions);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to start interview');
      navigate('/candidate/register');
    }
  };

  const handleSubmitAnswer = async (answer: string) => {
    setIsSubmitting(true);
    try {
      const currentQuestion = questions[currentQuestionIndex];
      await api.post('/interview/answer', {
        sessionId,
        qid: currentQuestion.qid,
        answer,
      });

      toast.success('Answer submitted successfully!');

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        await finishInterview();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit answer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTimeUp = () => {
    toast.warning('Time is up! Auto-submitting answer...');
    handleSubmitAnswer('Time expired - No answer provided');
  };

  const finishInterview = async () => {
    try {
      await api.post('/interview/finish', { sessionId });
      setIsCompleted(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to finish interview');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Preparing your interview...</p>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-md shadow-elegant">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Interview Completed!</h2>
              <p className="text-muted-foreground mb-4">
                Thank you for completing the technical assessment.
              </p>
              <p className="text-sm text-muted-foreground">
                Our team will review your responses and get back to you shortly.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">Technical Interview</h1>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              className="bg-gradient-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitting && (
            <InterviewQuestionCard
              key={currentQuestionIndex}
              question={questions[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              onSubmit={handleSubmitAnswer}
              onTimeUp={handleTimeUp}
            />
          )}
        </AnimatePresence>

        {isSubmitting && (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Submitting your answer...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interview;
