import { Button } from "@/components/ui/button";
import { Heart, Target, Users, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import couplesImage from "@/assets/couples-compatibility.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <div className="mb-8 flex justify-center">
            <Heart className="w-20 h-20 text-primary animate-float" fill="currentColor" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Perfeita Sintonia
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6">
            Descubra o nível de compatibilidade do seu relacionamento
          </p>
          
          <div className="mb-6 rounded-lg overflow-hidden shadow-2xl max-w-3xl mx-auto">
            <img 
              src={couplesImage} 
              alt="Casais felizes com suas porcentagens de compatibilidade" 
              className="w-full h-auto"
            />
          </div>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Usando a metodologia DISC, avaliamos como vocês se conectam, se complementam 
            e como podem fortalecer ainda mais sua relação
          </p>
          <Button
            size="lg"
            className="gradient-romantic text-lg px-8 py-6 hover:opacity-90 transition-opacity"
            onClick={() => navigate('/register')}
          >
            Descubra Agora Sua Compatibilidade
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="animate-scale-in border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6 text-center">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Análise Precisa</h3>
              <p className="text-muted-foreground">
                Metodologia DISC validada para entender perfis comportamentais
              </p>
            </CardContent>
          </Card>

          <Card className="animate-scale-in border-secondary/20 hover:border-secondary/40 transition-colors" style={{ animationDelay: '0.1s' }}>
            <CardContent className="pt-6 text-center">
              <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Compatibilidade Real</h3>
              <p className="text-muted-foreground">
                Descubra pontos fortes e desafios únicos do seu relacionamento
              </p>
            </CardContent>
          </Card>

          <Card className="animate-scale-in border-accent/20 hover:border-accent/40 transition-colors" style={{ animationDelay: '0.2s' }}>
            <CardContent className="pt-6 text-center">
              <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Totalmente Privado</h3>
              <p className="text-muted-foreground">
                Seus dados são seguros e utilizados apenas para sua análise
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">O que os casais dizem</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                "Incrível! Descobrimos coisas sobre nós mesmos que nem imaginávamos. 
                Isso nos ajudou muito a melhorar nossa comunicação."
              </p>
              <p className="font-semibold">— Ana e Carlos</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                "O relatório foi super completo e nos deu insights valiosos. 
                Recomendo para todos os casais!"
              </p>
              <p className="font-semibold">— Maria e João</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                "Entendemos melhor nossas diferenças e aprendemos a valorizar 
                o que cada um traz para a relação."
              </p>
              <p className="font-semibold">— Paula e Ricardo</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground">© 2024 Perfeita Sintonia. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Sobre Nós</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacidade</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
