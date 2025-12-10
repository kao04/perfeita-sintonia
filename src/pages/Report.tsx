import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, CheckCircle, Clock } from "lucide-react";
import { getUserData, updateUserData } from "@/utils/storage";
import { getProfileDescription } from "@/utils/discCalculator";
import { toast } from "sonner";

const Report = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const processedRef = useRef(false); // Evita processar duas vezes (React Strict Mode)

  useEffect(() => {
    // Função principal de verificação
    const verifyAccess = async () => {
      // Evita loops infinitos
      if (processedRef.current) return;
      
      const userData = getUserData();
      
      // 1. Sem usuário -> vai pro registro
      if (!userData) {
        navigate('/register');
        return;
      }

      // 2. Se JÁ tem acesso salvo localmente -> libera direto
      if (userData.hasPremiumReport) {
        setIsUnlocked(true);
        setIsLoading(false);
        return;
      }

      // 3. Verifica os parâmetros da URL vindos do Mercado Pago
      // O MP pode mandar 'status' ou 'collection_status'
      const status = searchParams.get('status') || searchParams.get('collection_status');
      const paymentId = searchParams.get('payment_id') || searchParams.get('collection_id');
      
      console.log("Status do Pagamento:", status); // Para Debug no Console (F12)

      if (status === 'approved' || status === 'pending') {
        processedRef.current = true; // Marca como processado
        
        try {
          // Salva no "Banco de Dados"
          await fetch('/api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'update_payment',
              email: userData.email,
              paymentId: paymentId,
              status: status
            })
          });

          // Libera o acesso no navegador
          updateUserData({ hasPremiumReport: true });
          setIsUnlocked(true);
          
          if (status === 'approved') {
            toast.success("Pagamento aprovado! Relatório liberado.");
          } else {
            toast.info("Pagamento em processamento. Liberamos seu acesso provisoriamente.");
          }

        } catch (error) {
          console.error("Erro ao salvar:", error);
          // Em caso de erro de rede, libera mesmo assim para não prejudicar o cliente
          updateUserData({ hasPremiumReport: true });
          setIsUnlocked(true);
        }
      } else {
        // Se NÃO tem status na URL e NÃO tem acesso salvo
        // Redireciona para a compra
        console.log("Nenhum pagamento encontrado. Redirecionando...");
        toast.error("Pagamento não identificado. Tente novamente.");
        navigate('/premium');
      }
      
      setIsLoading(false);
    };

    verifyAccess();
  }, [navigate, searchParams]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-muted-foreground animate-pulse">Verificando pagamento...</p>
      </div>
    );
  }

  // Se não liberou, não mostra nada (o useEffect vai redirecionar)
  if (!isUnlocked) return null;

  const userData = getUserData();
  if (!userData?.userResult || !userData?.partnerResult || !userData?.compatibility) return null;

  const handleDownload = () => {
    toast.success("Preparando download do PDF...");
    // Lógica futura de PDF
  };

  const userProfile = getProfileDescription(userData.userResult.profile);
  const partnerProfile = getProfileDescription(userData.partnerResult.profile);

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        
        {/* Mensagem de Sucesso */}
        <Card className="border-green-500/30 bg-green-500/5">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Pagamento Recebido!</h2>
            <p className="text-muted-foreground">
              Seu acesso ao Relatório Premium é vitalício.
            </p>
          </CardContent>
        </Card>

        {/* --- CONTEÚDO DO RELATÓRIO (MANTIDO IGUAL) --- */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              Relatório de Compatibilidade - {userData.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h3 className="text-xl font-bold mb-3">Resumo Executivo</h3>
              <p className="text-muted-foreground leading-relaxed">
                Este relatório apresenta uma análise completa da compatibilidade entre você 
                (perfil {userProfile.name}) e seu(sua) parceiro(a) (perfil {partnerProfile.name}). 
                Compatibilidade calculada: <strong className="text-foreground">{userData.compatibility.percentage}%</strong>.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3">Dinâmica</h3>
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
            
             <section>
              <h3 className="text-xl font-bold mb-3">Pontos Fortes da Relação</h3>
              <ul className="space-y-2">
                {userData.compatibility.strengths.map((strength, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span className="text-muted-foreground">{strength}</span>
                  </li>
                ))}
              </ul>
            </section>
          </CardContent>
        </Card>

        <Card className="border-primary/30">
          <CardContent className="p-6 text-center">
            <Button size="lg" className="gradient-romantic text-lg px-8" onClick={handleDownload}>
              <Download className="mr-2 w-5 h-5" />
              Baixar PDF Completo
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4">
           <Button variant="outline" onClick={() => navigate('/')}>Voltar ao Início</Button>
        </div>
      </div>
    </div>
  );
};

export default Report;