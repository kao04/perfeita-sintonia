import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Heart, FileText, LogOut } from "lucide-react";
import { getUserData, clearUserData } from "@/utils/storage";
import { UserData } from "@/types/disc";

const UserArea = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const data = getUserData();
    if (!data) {
      navigate('/register');
      return;
    }
    setUserData(data);
  }, [navigate]);

  const handleLogout = () => {
    clearUserData();
    navigate('/');
  };

  if (!userData) return null;

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle className="text-2xl">Olá, {userData.name}!</CardTitle>
                  <p className="text-muted-foreground">{userData.email}</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 w-4 h-4" />
                Sair
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Profile Info */}
        {userData.userResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-primary" />
                Seu Perfil DISC
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="text-lg px-4 py-1 bg-primary">
                  {userData.userResult.profile}
                </Badge>
                <span className="text-muted-foreground">
                  Perfil {userData.userResult.profile === 'D' ? 'Dominante' :
                           userData.userResult.profile === 'I' ? 'Influente' :
                           userData.userResult.profile === 'S' ? 'Estável' : 'Cauteloso'}
                </span>
              </div>
              {userData.compatibility && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="font-semibold mb-2">Compatibilidade com parceiro(a):</p>
                  <div className="text-3xl font-bold text-primary">
                    {userData.compatibility.percentage}%
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Seus Relatórios
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userData.hasPremiumReport ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">Relatório Premium de Compatibilidade</p>
                    <p className="text-sm text-muted-foreground">Adquirido</p>
                  </div>
                  <Button onClick={() => navigate('/report')}>
                    Ver Relatório
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  Você ainda não possui relatórios premium
                </p>
                <Button
                  className="gradient-romantic"
                  onClick={() => navigate('/premium')}
                >
                  Adquirir Relatório Premium
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={() => navigate('/result')}>
            Ver Resultado da Avaliação
          </Button>
          <Button variant="outline" onClick={() => navigate('/')}>
            Voltar ao Início
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserArea;
