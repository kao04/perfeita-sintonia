import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, CreditCard } from "lucide-react";
import { toast } from "sonner";

const Premium = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Pagamento realizado com sucesso!");
      navigate('/report');
    }, 2000);
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <Card>
          <CardHeader className="text-center">
            <Badge className="mx-auto mb-4 bg-primary text-lg px-4 py-1">Premium</Badge>
            <CardTitle className="text-3xl md:text-4xl mb-2">
              Relatório Completo de Compatibilidade
            </CardTitle>
            <p className="text-muted-foreground text-lg">
              Desbloqueie insights profundos sobre seu relacionamento
            </p>
          </CardHeader>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>O que você vai receber:</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Análise Detalhada</strong>
                  <p className="text-muted-foreground">
                    Mergulhe fundo nos perfis DISC e entenda como vocês funcionam juntos
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Estratégias Práticas</strong>
                  <p className="text-muted-foreground">
                    Receba recomendações específicas para melhorar a comunicação e conexão
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Gestão de Conflitos</strong>
                  <p className="text-muted-foreground">
                    Aprenda a lidar com desafios de forma construtiva
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Plano de Ação Personalizado</strong>
                  <p className="text-muted-foreground">
                    Passos práticos para fortalecer sua relação imediatamente
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Relatório em PDF</strong>
                  <p className="text-muted-foreground">
                    Baixe e consulte sempre que precisar
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card className="border-primary/30">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-gradient mb-2">R$ 49,90</div>
              <p className="text-muted-foreground">Pagamento único • Acesso imediato</p>
            </div>
            
            <Button
              size="lg"
              className="w-full gradient-romantic text-lg py-6"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              <CreditCard className="mr-2 w-5 h-5" />
              {isProcessing ? "Processando..." : "Comprar Agora via Mercado Pago"}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Pagamento 100% seguro via Mercado Pago
            </p>
          </CardContent>
        </Card>

        {/* Back */}
        <div className="text-center">
          <Button variant="outline" onClick={() => navigate('/result')}>
            Voltar aos Resultados
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
