import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, CheckCircle, AlertTriangle, FileText } from "lucide-react"; // Adicionei ícones
import { getUserData, updateUserData } from "@/utils/storage";
import { getProfileDescription } from "@/utils/discCalculator";
import { toast } from "sonner";

const Report = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const processedRef = useRef(false);

  useEffect(() => {
    const verifyAccess = async () => {
      if (processedRef.current) return;
      
      const userData = getUserData();
      
      // 1. Se já tem acesso salvo
      if (userData?.hasPremiumReport) {
        setIsUnlocked(true);
        setIsLoading(false);
        return;
      }

      // 2. Verifica retorno do Mercado Pago
      const status = searchParams.get('status') || searchParams.get('collection_status');
      
      if (status === 'approved' || status === 'pending') {
        processedRef.current = true;
        
        try {
          // Salva que o usuário pagou (libera acesso)
          updateUserData({ hasPremiumReport: true });
          setIsUnlocked(true);
          
          if (status === 'approved') {
            toast.success("Pagamento confirmado!");
          } else {
            toast.info("Pagamento em processamento. Acesso liberado provisoriamente.");
          }
        } catch (error) {
          console.error("Erro ao processar:", error);
        }
      } 
      // Se não tiver status e não tiver acesso, vamos checar se tem dados do quiz pelo menos
      else if (!userData) {
         navigate('/register'); // Sem dados nenhum, volta pro registro
         return;
      }
      
      setIsLoading(false);
    };

    verifyAccess();
  }, [navigate, searchParams]);

  const handleDownload = () => {
    // FUNÇÃO PARA BAIXAR/IMPRIMIR DE VERDADE
    window.print(); 
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // --- ÁREA DE SEGURANÇA CONTRA TELA BRANCA ---
  const userData = getUserData();
  
  // Se pagou, mas perdemos os dados do Quiz (comum se trocou de navegador/aba anônima)
  if (isUnlocked && (!userData?.userResult || !userData?.compatibility)) {
    return (
      <div className="min-h-screen px-4 py-12 flex items-center justify-center">
        <Card className="max-w-lg border-yellow-500/50 bg-yellow-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700">
              <AlertTriangle className="h-6 w-6" />
              Dados do Teste não Encontrados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Identificamos seu pagamento, <strong>mas não encontramos as respostas do seu teste</strong> neste navegador.
            </p>
            <p className="text-sm">Isso acontece se você:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground ml-2">
              <li>Abriu o link de pagamento em outro navegador (celular vs computador)</li>
              <li>Usou aba anônima</li>
              <li>Limpou o histórico</li>
            </ul>
            <Button onClick={() => navigate('/quiz')} className="w-full mt-4">
              Refazer o Teste Rapidamente (Seu pagamento continua salvo)
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Se não está desbloqueado e não veio do MP
  if (!isUnlocked) {
      // Redirecionamento de segurança caso o useEffect falhe
      return <div className="p-8 text-center">Acesso restrito. <Button variant="link" onClick={() => navigate('/premium')}>Ir para Pagamento</Button></div>;
  }

  // --- RENDERIZAÇÃO DO RELATÓRIO ---

  const userProfile = getProfileDescription(userData.userResult.profile);
  const partnerProfile = getProfileDescription(userData.partnerResult.profile);

  return (
    <div className="min-h-screen px-4 py-12 print:py-0 print:px-0 bg-background">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in print:space-y-4">
        
        {/* Header do Pagamento - some na impressão */}
        <Card className="border-green-500/30 bg-green-500/5 print:hidden">
          <CardContent className="p-6 text-center flex flex-col items-center gap-2">
            <CheckCircle className="w-12 h-12 text-green-600" />
            <div>
              <h2 className="text-xl font-bold text-green-700">Relatório Liberado!</h2>
              <p className="text-sm text-green-600/80">Obrigado por sua compra.</p>
            </div>
          </CardContent>
        </Card>

        {/* Conteúdo do Relatório */}
        <div id="report-content">
          <Card className="print:shadow-none print:border-none">
            <CardHeader className="text-center border-b pb-6">
              <div className="flex justify-center mb-4">
                <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">
                  Relatório Oficial
                </span>
              </div>
              <CardTitle className="text-3xl md:text-4xl">
                Compatibilidade Amorosa
              </CardTitle>
              <p className="text-lg text-muted-foreground mt-2">
                {userData.name} & {userData.partnerName}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8 pt-8">
              {/* Resumo */}
              <section className="space-y-3">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Análise Geral
                </h3>
                <div className="p-6 bg-muted/50 rounded-xl">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    A compatibilidade calculada entre <strong>{userProfile.name}</strong> e <strong>{partnerProfile.name}</strong> é de <span className="text-primary font-bold text-2xl">{userData.compatibility.percentage}%</span>.
                  </p>
                </div>
              </section>

              {/* Perfis */}
              <section className="grid md:grid-cols-2 gap-6">
                <div className="p-6 border rounded-xl bg-card">
                  <h4 className="font-bold text-lg mb-2 text-primary">{userData.name}</h4>
                  <div className="text-sm font-medium text-muted-foreground uppercase mb-2">Perfil: {userProfile.name}</div>
                  <p className="text-sm leading-relaxed">{userProfile.description}</p>
                </div>
                <div className="p-6 border rounded-xl bg-card">
                  <h4 className="font-bold text-lg mb-2 text-primary">{userData.partnerName}</h4>
                  <div className="text-sm font-medium text-muted-foreground uppercase mb-2">Perfil: {partnerProfile.name}</div>
                  <p className="text-sm leading-relaxed">{partnerProfile.description}</p>
                </div>
              </section>

              {/* Pontos Fortes */}
              <section>
                <h3 className="text-xl font-bold mb-4">Pontos Fortes da União</h3>
                <ul className="grid gap-3">
                  {userData.compatibility.strengths.map((strength, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{strength}</span>
                    </li>
                  ))}
                </ul>
              </section>
              
              {/* Challenges (Adicionado se existir nos dados) */}
               <section>
                <h3 className="text-xl font-bold mb-4">Áreas de Atenção</h3>
                <ul className="grid gap-3">
                  {userData.compatibility.challenges.map((challenge, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 bg-destructive/5 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-destructive/60 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </section>

            </CardContent>
          </Card>
        </div>

        {/* Botões de Ação - Somem na impressão */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t md:relative md:bg-transparent md:border-none md:p-0 print:hidden">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 justify-center">
            <Button size="lg" className="w-full md:w-auto shadow-lg" onClick={handleDownload}>
              <Download className="mr-2 w-5 h-5" />
              Salvar PDF / Imprimir
            </Button>
            <Button variant="outline" className="w-full md:w-auto" onClick={() => navigate('/')}>
              Voltar ao Início
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Report;