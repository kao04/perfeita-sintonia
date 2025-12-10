import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Loader2 } from "lucide-react";
import { saveUserData } from "@/utils/storage";
import { toast } from "sonner";

// URL do seu site na Hostinger
const API_BASE_URL = 'https://perfeitasintonia.com.br';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    partnerName: "", // <--- NOVO CAMPO
    email: "",
    phone: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação inclui o nome do parceiro agora
    if (!formData.name || !formData.partnerName || !formData.email) {
      toast.error("Por favor, preencha os nomes e o e-mail");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Envia para o arquivo PHP na Hostinger
      const response = await fetch(`${API_BASE_URL}/api.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          partnerName: formData.partnerName, // <--- ENVIANDO PARA API
          email: formData.email,
          phone: formData.phone
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao salvar no banco de dados');
      }

      // 2. Salva no LocalStorage (Para o Relatório e Quiz funcionarem)
      saveUserData({
        name: formData.name,
        partnerName: formData.partnerName, // <--- SALVANDO LOCALMENTE
        email: formData.email,
        phone: formData.phone
      });

      toast.success("Cadastro realizado com sucesso!");
      
      // 3. Redireciona para o Quiz
      navigate('/quiz/user');

    } catch (error) {
      console.error("Erro no cadastro:", error);
      // Mesmo se der erro na API, tentamos salvar local para o usuário não travar
      saveUserData({
        name: formData.name,
        partnerName: formData.partnerName,
        email: formData.email,
        phone: formData.phone
      });
      navigate('/quiz/user');
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader className="text-center">
          <Heart className="w-12 h-12 text-primary mx-auto mb-4 animate-float" fill="currentColor" />
          <CardTitle className="text-3xl">Bem-vindo!</CardTitle>
          <CardDescription className="text-base">
            Vamos começar conhecendo vocês.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Seu Nome */}
            <div>
              <Label htmlFor="name">Seu Nome Completo *</Label>
              <Input
                id="name"
                placeholder="Ex: João Silva"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>

            {/* Nome do Parceiro(a) - NOVO CAMPO */}
            <div>
              <Label htmlFor="partnerName">Nome do(a) Parceiro(a) *</Label>
              <Input
                id="partnerName"
                placeholder="Ex: Maria Oliveira"
                value={formData.partnerName}
                onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>

            {/* Telefone */}
            <div>
              <Label htmlFor="phone">Telefone (opcional)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={isLoading}
              />
            </div>

            <p className="text-sm text-muted-foreground">
              Ao continuar, você concorda com nossa política de privacidade. 
              Seus dados serão usados apenas para a análise de compatibilidade.
            </p>

            <Button 
              type="submit" 
              className="w-full gradient-romantic"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Começar Avaliação"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;