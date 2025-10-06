import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mic, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Timer from './Timer';

interface Question {
  qid: string;
  question: string;
  timeLimit: number;
}

interface InterviewQuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onSubmit: (answer: string) => void;
  onTimeUp: () => void;
}

const InterviewQuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  onSubmit,
  onTimeUp,
}: InterviewQuestionCardProps) => {
  const [answer, setAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleRecord = () => {
    setIsRecording(true);
    toast.info('Recording started (simulated)');
    
    // Simulate voice recording - auto-fill after 2 seconds
    setTimeout(() => {
      setIsRecording(false);
      setAnswer(prev => prev + '\n[Voice input simulated: This is my answer to the question...]');
      toast.success('Recording completed');
    }, 2000);
  };

  const handleSubmit = () => {
    if (!answer.trim()) {
      toast.error('Please provide an answer before submitting');
      return;
    }
    onSubmit(answer);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-card">
        <CardHeader className="bg-gradient-primary text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              Question {questionNumber} of {totalQuestions}
            </CardTitle>
            <Timer timeLimit={question.timeLimit} onTimeUp={onTimeUp} />
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-lg font-medium text-foreground leading-relaxed">
              {question.question}
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Your Answer</label>
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="min-h-[200px] resize-none"
              disabled={isRecording}
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleRecord}
              disabled={isRecording}
              className="gap-2"
            >
              <Mic className={`h-4 w-4 ${isRecording ? 'animate-timer-pulse text-destructive' : ''}`} />
              {isRecording ? 'Recording...' : 'Record Answer'}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!answer.trim() || isRecording}
              className="gap-2 flex-1"
            >
              <Send className="h-4 w-4" />
              Submit Answer
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InterviewQuestionCard;
