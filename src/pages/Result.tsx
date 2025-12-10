import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { getUserData } from "@/utils/storage";
import { calculateCompatibility, getProfileDescription } from "@/utils/discCalculator";
import { CompatibilityResult } from "@/types/disc";

const Result = () => {
  const navigate = useNavigate();
  const [compatibility, setCompatibility] = useState<CompatibilityResult | null>(null);
  const [userName, setUserName] = useState("");
  const [partnerName, setPartnerName] = useState(""); // <--- ESTADO NOVO

  useEffect(() => {
    const userData = getUserData();
    
    if (!userData?.userResult || !userData?.partnerResult) {
      navigate('/register');
      return;
    }

    setUserName(userData.name);
    // Pega o nome do parceiro ou usa um padrão se não existir
    setPartnerName(userData.partnerName || "Parceiro(a)"); // <--- ATRIBUIÇÃO AQUI

    const result = calculateCompatibility(
      userData.userResult.profile,
      userData.partnerResult.profile
    );
    setCompatibility(result);
  }, [navigate]);

  if (!compatibility) return null;

  const userProfile = getProfileDescription(compatibility.userProfile);
  const partnerProfile = getProfileDescription(compatibility.partnerProfile);

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <Card className="text-center border-primary/30">
          <CardHeader>
            <Heart className="w-16 h-16 text-primary mx-auto mb-4 animate-float" fill="currentColor" />
            <CardTitle className="text-3xl md:text-4xl mb-4">
              Resultado da Compatibilidade
            </CardTitle>
            <div className="text-6xl md:text-7xl font-bold text-gradient my-6">
              {compatibility.percentage}%
            </div>
            <p className="text-xl text-muted-foreground">
              {compatibility.percentage >= 70 
                ? "Vocês têm uma ótima compatibilidade!" 
                : compatibility.percentage >= 50
                ? "Vocês têm potencial, mas precisam trabalhar algumas áreas"
                : "Vocês têm desafios importantes para superar juntos"}
            </p>
          </CardHeader>
        </Card>

        {/* Profiles */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Perfil de {userName}</span> {/* Nome do Usuário */}
                <Badge className="bg-primary">{compatibility.userProfile}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-lg mb-2">{userProfile.name}</h4>
              <p className="text-muted-foreground mb-4">{userProfile.description}</p>
              <div className="flex flex-wrap gap-2">
                {userProfile.traits.map((trait, i) => (
                  <Badge key={i} variant="secondary">{trait}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {/* AQUI ESTÁ A MUDANÇA VISUAL PRINCIPAL */}
                <span>Perfil de {partnerName}</span> 
                <Badge className="bg-secondary">{compatibility.partnerProfile}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-lg mb-2">{partnerProfile.name}</h4>
              <p className="text-muted-foreground mb-4">{partnerProfile.description}</p>
              <div className="flex flex-wrap gap-2">
                {partnerProfile.traits.map((trait, i) => (
                  <Badge key={i} variant="secondary">{trait}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Strengths */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-primary" />
              Pontos Fortes do Casal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {compatibility.strengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Challenges */}
        <Card className="border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-accent" />
              Desafios a Superar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {compatibility.challenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* CTA for Premium */}
        <Card className="gradient-romantic text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Quer entender melhor seu relacionamento?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Tenha acesso ao <strong>Relatório Premium Personalizado</strong> com análise 
              detalhada, estratégias práticas e recomendações exclusivas para fortalecer 
              sua relação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="text-3xl font-bold">R$ 49,90</div>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => navigate('/premium')}
              >
                Adquirir Relatório Completo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Back Home */}
        <div className="text-center">
          <Button variant="outline" onClick={() => navigate('/')}>
            Voltar ao Início
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Result;