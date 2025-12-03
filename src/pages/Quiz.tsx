import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { discQuestions } from "@/data/discQuestions";
import { QuizAnswer, DISCProfile } from "@/types/disc";
import { calculateDISCProfile } from "@/utils/discCalculator";
import { getUserData, updateUserData } from "@/utils/storage";
import { toast } from "sonner";
import { Heart } from "lucide-react";

const Quiz = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: 'user' | 'partner' }>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  useEffect(() => {
    const userData = getUserData();
    if (!userData) {
      navigate('/register');
    }
  }, [navigate]);

  useEffect(() => {
    // Reset state when switching between user and partner quiz
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer("");
  }, [type]);

  const question = discQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / discQuestions.length) * 100;
  const isLastQuestion = currentQuestion === discQuestions.length - 1;
  const title = type === 'user' ? 'Seu Perfil' : 'Perfil do(a) Seu(Sua) Parceiro(a)';
  const description = type === 'user' 
    ? 'Responda com sinceridade sobre você'
    : 'Responda pensando em como seu(sua) parceiro(a) agiria';

  const handleNext = () => {
    if (!selectedAnswer) {
      toast.error("Por favor, selecione uma resposta");
      return;
    }

    const option = question.options.find(opt => opt.text === selectedAnswer);
    if (!option) return;

    const newAnswers = [...answers, {
      questionId: question.id,
      answer: selectedAnswer,
      profile: option.profile
    }];

    setAnswers(newAnswers);

    if (isLastQuestion) {
      const result = calculateDISCProfile(newAnswers);
      
      if (type === 'user') {
        updateUserData({ userResult: result });
        navigate('/quiz/partner');
      } else {
        updateUserData({ partnerResult: result });
        navigate('/result');
      }
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      const newCurrentQuestion = currentQuestion - 1;
      const newAnswers = answers.slice(0, -1);
      
      setCurrentQuestion(newCurrentQuestion);
      setAnswers(newAnswers);
      setSelectedAnswer(newAnswers[newCurrentQuestion]?.answer || "");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl animate-fade-in">
        <CardHeader className="text-center">
          <Heart className="w-10 h-10 text-primary mx-auto mb-2" fill="currentColor" />
          <CardTitle className="text-2xl md:text-3xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Pergunta {currentQuestion + 1} de {discQuestions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 rounded-lg border-2 transition-colors hover:border-primary/50 cursor-pointer"
                    onClick={() => setSelectedAnswer(option.text)}
                  >
                    <RadioGroupItem value={option.text} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer leading-relaxed"
                    >
                      {option.text}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-between gap-4 pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentQuestion === 0}
            >
              Voltar
            </Button>
            <Button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="gradient-romantic"
            >
              {isLastQuestion ? 'Finalizar' : 'Próxima'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;
