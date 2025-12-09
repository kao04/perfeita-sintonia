import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // Importar useSearchParams
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, CheckCircle, Lock } from "lucide-react";
import { getUserData, updateUserData } from "@/utils/storage";
import { getProfileDescription } from "@/utils/discCalculator";
import { toast } from "sonner";

const Report = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Hook para ler a URL
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAccess = async () => {
      const userData = getUserData();
      
      // 1. Se não tiver dados básicos, manda pro registro
      if (!userData) {
        navigate('/register');
        return;
      }

      // 2. Se o usuário JÁ tem o relatório liberado no local storage
      if (userData.hasPremiumReport) {
        setIsUnlocked(true);
        setIsLoading(false);
        return;
      }

      // 3. Se está voltando do Mercado Pago com Aprovação
      const status = searchParams.get('status'); // Pega o ?status= da URL
      
      if (status === 'approved') {
        try {
          // Atualiza no Backend (PHP/JSON)
          await fetch('/api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'update_payment',
              email: userData.email
            })
          });

          // Atualiza no Navegador (Local Storage)
          updateUserData({ hasPremiumReport: true });
          
          setIsUnlocked(true);
          toast.success("Pagamento confirmado! Seu relatório foi liberado.");
        } catch (error) {
          console.error("Erro ao salvar pagamento", error);
          // Mesmo com erro no backend, liberamos se o MP disse que está ok
          updateUserData({ hasPremiumReport: true });
          setIsUnlocked(true);
        }
      } else {
        // Se não tem permissão e não veio do pagamento aprovado
        // Redireciona de volta para a oferta Premium
        toast.error("Você precisa finalizar o pagamento para ver o relatório.");
        navigate('/premium');
      }
      
      setIsLoading(false);
    };

    verifyAccess();
  }, [navigate, searchParams]);

  // Loading state simples
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary font-bold text-xl">Verificando pagamento...</div>
      </div>
    );
  }

  // Se não estiver desbloqueado (embora o useEffect deva redirecionar), não mostra nada
  if (!isUnlocked) return null;

  const userData = getUserData();
  // Verificação de segurança extra para os dados
  if (!userData?.userResult || !userData?.partnerResult || !userData?.compatibility) {
    return null;
  }

  const handleDownload = () => {
    toast.success("Seu relatório está sendo preparado para download!");
    // Aqui você implementaria a geração real do PDF
  };

  const userProfile = getProfileDescription(userData.userResult.profile);
  const partnerProfile = getProfileDescription(userData.partnerResult.profile);

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Success Message */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Acesso Liberado!</h2>
            <p className="text-muted-foreground">
              Seu Relatório Premium de Compatibilidade está pronto
            </p>
          </CardContent>
        </Card>

        {/* Report Content Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              Relatório de Compatibilidade - {userData.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Executive Summary */}
            <section>
              <h3 className="text-xl font-bold mb-3">Resumo Executivo</h3>
              <p className="text-muted-foreground leading-relaxed">
                Este relatório apresenta uma análise completa da compatibilidade entre você 
                (perfil {userProfile.name}) e seu(sua) parceiro(a) (perfil {partnerProfile.name}). 
                Com base na metodologia DISC, identificamos um nível de compatibilidade de{" "}
                <strong className="text-foreground">{userData.compatibility.percentage}%</strong>, 
                o que indica {userData.compatibility.percentage >= 70 ? "uma relação harmoniosa com grande potencial" : 
                userData.compatibility.percentage >= 50 ? "uma relação com bom potencial, mas que requer atenção em áreas específicas" :
                "uma relação desafiadora que pode se beneficiar significativamente de ajustes mútuos"}.
              </p>
            </section>

            {/* Your Profiles */}
            <section>
              <h3 className="text-xl font-bold mb-3">Perfis Individuais</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Seu Perfil: {userProfile.name}</h4>
                  <p className="text-sm text-muted-foreground">{userProfile.description}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Parceiro(a): {partnerProfile.name}</h4>
                  <p className="text-sm text-muted-foreground">{partnerProfile.description}</p>
                </div>
              </div>
            </section>

            {/* Dynamics */}
            <section>
              <h3 className="text-xl font-bold mb-3">Dinâmica do Relacionamento</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A combinação de perfis {userData.userResult.profile} e {userData.partnerResult.profile} 
                cria uma dinâmica única. Vocês podem se beneficiar muito ao:
              </p>
              <ul className="space-y-2">
                {userData.compatibility.strengths.map((strength, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span className="text-muted-foreground">{strength}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Action Plan */}
            <section>
              <h3 className="text-xl font-bold mb-3">Plano de Ação</h3>
              <div className="space-y-3">
                <div className="p-4 border-l-4 border-primary bg-primary/5">
                  <h4 className="font-semibold mb-1">Curto Prazo (1-2 semanas)</h4>
                  <p className="text-sm text-muted-foreground">
                    Estabeleçam momentos de diálogo aberto sobre as diferenças de perfil. 
                    Compartilhem este relatório e discutam como cada um se vê nas descrições.
                  </p>
                </div>
                <div className="p-4 border-l-4 border-secondary bg-secondary/5">
                  <h4 className="font-semibold mb-1">Médio Prazo (1-2 meses)</h4>
                  <p className="text-sm text-muted-foreground">
                    Implementem estratégias específicas de comunicação baseadas nos perfis. 
                    Pratiquem reconhecer e valorizar as diferenças como complementos.
                  </p>
                </div>
                <div className="p-4 border-l-4 border-accent bg-accent/5">
                  <h4 className="font-semibold mb-1">Longo Prazo (3+ meses)</h4>
                  <p className="text-sm text-muted-foreground">
                    Estabeleçam rituais de conexão que atendam às necessidades de ambos os perfis. 
                    Revisitem este relatório periodicamente para medir o progresso.
                  </p>
                </div>
              </div>
            </section>

            {/* Additional Resources */}
            <section>
              <h3 className="text-xl font-bold mb-3">Recursos Adicionais</h3>
              <p className="text-muted-foreground">
                Este é um resumo do seu relatório completo. O documento PDF contém análises 
                mais detalhadas, exercícios práticos e exemplos específicos para sua combinação 
                de perfis.
              </p>
            </section>
          </CardContent>
        </Card>

        {/* Download Button */}
        <Card className="border-primary/30">
          <CardContent className="p-6 text-center">
            <Button
              size="lg"
              className="gradient-romantic text-lg px-8"
              onClick={handleDownload}
            >
              <Download className="mr-2 w-5 h-5" />
              Baixar Relatório Completo em PDF
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              O relatório completo contém 15-20 páginas de análise detalhada
            </p>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => navigate('/user-area')}>
            Ir para Minha Área
          </Button>
          <Button variant="outline" onClick={() => navigate('/')}>
            Voltar ao Início
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Report;