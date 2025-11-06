import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface PromoCode {
  id: number;
  code: string;
  title: string;
  description: string;
  price: number;
  seller_id: number;
  status: string;
}

interface ChatMessage {
  id: number;
  sender_id: number;
  message: string;
  created_at: string;
}

const Index = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [selectedPromo, setSelectedPromo] = useState<PromoCode | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);

  const newsItems = [
    {
      id: 1,
      title: 'Обновление 2.0: Новые возможности',
      date: '5 ноября 2025',
      description: 'Встречайте крупнейшее обновление года! Новые локации, транспорт и система домов.',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800'
    },
    {
      id: 2,
      title: 'Турнир по дрифту',
      date: '3 ноября 2025',
      description: 'Примите участие в грандиозном турнире! Призовой фонд 5 миллионов игровой валюты.',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800'
    },
    {
      id: 3,
      title: 'Маркетплейс промокодов',
      date: '1 ноября 2025',
      description: 'Теперь вы можете покупать и продавать игровые промокоды! Общайтесь с продавцами в чате.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800'
    }
  ];

  useEffect(() => {
    const mockPromos: PromoCode[] = [
      {
        id: 1,
        code: 'VIP2024',
        title: 'VIP статус на месяц',
        description: 'Получите VIP привилегии на 30 дней',
        price: 500,
        seller_id: 1,
        status: 'available'
      },
      {
        id: 2,
        code: 'MONEY1M',
        title: '1 миллион игровой валюты',
        description: 'Получите 1,000,000$ на игровой счёт',
        price: 300,
        seller_id: 2,
        status: 'available'
      },
      {
        id: 3,
        code: 'HOUSE50',
        title: 'Скидка 50% на дом',
        description: 'Скидка на покупку любого дома в городе',
        price: 450,
        seller_id: 1,
        status: 'available'
      }
    ];
    setPromoCodes(mockPromos);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedPromo) return;

    const message: ChatMessage = {
      id: Date.now(),
      sender_id: currentUser?.id || 999,
      message: newMessage,
      created_at: new Date().toISOString()
    };

    setChatMessages([...chatMessages, message]);
    setNewMessage('');
    toast({
      title: 'Сообщение отправлено',
      description: 'Продавец получит ваше сообщение'
    });
  };

  const renderHome = () => (
    <div className="min-h-screen">
      <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-background/50 to-background z-0"></div>
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4) saturate(1.2)'
          }}
        ></div>
        
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <div className="mb-6 inline-block">
            <Badge className="bg-primary/20 text-primary border-primary/50 text-lg px-6 py-2">
              <Icon name="Sparkles" className="mr-2" size={16} />
              Сервер №1 в СНГ
            </Badge>
          </div>
          <h1 className="text-7xl md:text-9xl font-black mb-6 glow-purple tracking-tight">
            MAJESTIC RP
          </h1>
          <p className="text-2xl md:text-3xl mb-4 text-foreground font-light">
            Создай свою историю в мире безграничных возможностей
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Присоединяйся к более чем 10,000 игроков онлайн. Торгуй промокодами на маркетплейсе!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-10 py-6 border-glow shadow-lg shadow-primary/50">
              <Icon name="Gamepad2" className="mr-2" size={24} />
              Начать играть
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-10 py-6 border-2 border-primary/50 hover:bg-primary/10 hover:border-primary"
              onClick={() => setCurrentSection('promo')}
            >
              <Icon name="ShoppingBag" className="mr-2" size={24} />
              Промокоды
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-12 px-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary glow-purple">10,000+</div>
            <div className="text-sm text-muted-foreground">Игроков онлайн</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-secondary glow-blue">500+</div>
            <div className="text-sm text-muted-foreground">Промокодов</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent">24/7</div>
            <div className="text-sm text-muted-foreground">Поддержка</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="bg-gradient-to-br from-card to-card/50 border-primary/30 hover:border-primary transition-all hover:shadow-xl hover:shadow-primary/20 animate-scale-in group">
            <CardHeader>
              <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Users" className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">Активное комьюнити</CardTitle>
              <CardDescription className="text-base">Более 10,000 игроков онлайн каждый день. Найди новых друзей!</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/50 border-secondary/30 hover:border-secondary transition-all hover:shadow-xl hover:shadow-secondary/20 animate-scale-in group" style={{animationDelay: '0.1s'}}>
            <CardHeader>
              <div className="w-16 h-16 rounded-xl bg-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Trophy" className="w-10 h-10 text-secondary" />
              </div>
              <CardTitle className="text-2xl">Уникальные ивенты</CardTitle>
              <CardDescription className="text-base">Регулярные турниры и конкурсы с крупными призами</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/50 border-accent/30 hover:border-accent transition-all hover:shadow-xl hover:shadow-accent/20 animate-scale-in group" style={{animationDelay: '0.2s'}}>
            <CardHeader>
              <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name="ShoppingBag" className="w-10 h-10 text-accent" />
              </div>
              <CardTitle className="text-2xl">Маркетплейс</CardTitle>
              <CardDescription className="text-base">Покупай и продавай промокоды с другими игроками</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 glow-blue">Последние новости</h2>
          <p className="text-muted-foreground text-xl">Будьте в курсе всех событий</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((news) => (
            <Card key={news.id} className="overflow-hidden bg-card border-primary/20 hover:border-primary/50 transition-all cursor-pointer group hover:shadow-xl">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
              </div>
              <CardHeader>
                <Badge className="w-fit mb-2 bg-primary/20 text-primary border-primary/30">{news.date}</Badge>
                <CardTitle className="text-2xl mb-2">{news.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{news.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNews = () => (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-6xl font-bold mb-4 glow-purple">Новости</h1>
        <p className="text-muted-foreground text-xl">Все обновления и события сервера</p>
      </div>

      <div className="space-y-6 max-w-5xl mx-auto">
        {newsItems.map((news) => (
          <Card key={news.id} className="overflow-hidden bg-card border-primary/20 hover:border-primary transition-all animate-scale-in hover:shadow-xl">
            <div className="md:flex">
              <div className="md:w-2/5 h-72 md:h-auto relative overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="md:w-3/5">
                <CardHeader>
                  <Badge className="w-fit mb-3 bg-primary/20 text-primary border-primary/30">{news.date}</Badge>
                  <CardTitle className="text-3xl mb-4">{news.title}</CardTitle>
                  <CardDescription className="text-lg leading-relaxed">{news.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="border-primary/50 hover:bg-primary/10 hover:border-primary">
                    Читать полностью
                    <Icon name="ArrowRight" className="ml-2" size={18} />
                  </Button>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderPromo = () => (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-6xl font-bold mb-4 glow-purple">Маркетплейс промокодов</h1>
        <p className="text-muted-foreground text-xl">Покупай игровые бонусы у других игроков</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {promoCodes.map((promo) => (
          <Card key={promo.id} className="bg-gradient-to-br from-card to-card/50 border-primary/20 hover:border-primary transition-all cursor-pointer group hover:shadow-xl animate-scale-in">
            <CardHeader>
              <div className="flex items-start justify-between mb-3">
                <Badge className="bg-accent/20 text-accent border-accent/30">
                  <Icon name="Tag" className="mr-1" size={14} />
                  {promo.code}
                </Badge>
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  {promo.price} ₽
                </Badge>
              </div>
              <CardTitle className="text-2xl mb-2">{promo.title}</CardTitle>
              <CardDescription className="text-base mb-4">{promo.description}</CardDescription>
              <Button 
                className="w-full bg-primary hover:bg-primary/90 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all"
                onClick={() => setSelectedPromo(promo)}
              >
                <Icon name="MessageSquare" className="mr-2" size={18} />
                Связаться с продавцом
              </Button>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedPromo} onOpenChange={(open) => !open && setSelectedPromo(null)}>
        <DialogContent className="bg-card border-primary/30 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl glow-purple">{selectedPromo?.title}</DialogTitle>
            <DialogDescription className="text-lg">
              Цена: {selectedPromo?.price} ₽ • Код: {selectedPromo?.code}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <h3 className="font-semibold mb-4 text-lg">Чат с продавцом</h3>
            <ScrollArea className="h-72 border border-primary/20 rounded-lg p-4 bg-muted/10">
              {chatMessages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <Icon name="MessageSquare" className="mx-auto mb-2" size={40} />
                  <p>Начните диалог с продавцом</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {chatMessages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`flex ${msg.sender_id === (currentUser?.id || 999) ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        msg.sender_id === (currentUser?.id || 999) 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p>{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(msg.created_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            <div className="flex gap-2 mt-4">
              <Input
                placeholder="Введите сообщение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="border-primary/30"
              />
              <Button onClick={handleSendMessage} className="bg-primary hover:bg-primary/90">
                <Icon name="Send" size={18} />
              </Button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-primary/20">
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Icon name="ShoppingCart" className="mr-2" size={18} />
              Купить за {selectedPromo?.price} ₽
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-primary/20 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentSection('home')}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Gamepad2" className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black glow-purple tracking-tight">MAJESTIC</span>
          </div>

          <div className="hidden md:flex gap-2">
            <Button 
              variant={currentSection === 'home' ? 'default' : 'ghost'}
              onClick={() => setCurrentSection('home')}
              className={currentSection === 'home' ? 'bg-primary hover:bg-primary/90' : 'hover:bg-primary/10'}
            >
              <Icon name="Home" className="mr-2" size={18} />
              Главная
            </Button>
            <Button 
              variant={currentSection === 'news' ? 'default' : 'ghost'}
              onClick={() => setCurrentSection('news')}
              className={currentSection === 'news' ? 'bg-primary hover:bg-primary/90' : 'hover:bg-primary/10'}
            >
              <Icon name="Newspaper" className="mr-2" size={18} />
              Новости
            </Button>
            <Button 
              variant={currentSection === 'promo' ? 'default' : 'ghost'}
              onClick={() => setCurrentSection('promo')}
              className={currentSection === 'promo' ? 'bg-primary hover:bg-primary/90' : 'hover:bg-primary/10'}
            >
              <Icon name="ShoppingBag" className="mr-2" size={18} />
              Промокоды
            </Button>
          </div>

          <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 border-glow shadow-lg shadow-primary/30">
                <Icon name="User" className="mr-2" size={18} />
                Войти
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-primary/30">
              <DialogHeader>
                <DialogTitle className="text-3xl glow-purple">
                  {authMode === 'login' ? 'Авторизация' : 'Регистрация'}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {authMode === 'login' 
                    ? 'Войдите в свой аккаунт для доступа к профилю' 
                    : 'Создайте новый аккаунт для начала игры'}
                </DialogDescription>
              </DialogHeader>

              <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as 'login' | 'register')} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="login">Вход</TabsTrigger>
                  <TabsTrigger value="register">Регистрация</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-username">Логин</Label>
                    <Input id="login-username" placeholder="Введите логин" className="border-primary/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Пароль</Label>
                    <Input id="login-password" type="password" placeholder="Введите пароль" className="border-primary/30" />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30">
                    <Icon name="LogIn" className="mr-2" size={18} />
                    Войти
                  </Button>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-username">Логин</Label>
                    <Input id="register-username" placeholder="Придумайте логин" className="border-primary/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input id="register-email" type="email" placeholder="Введите email" className="border-primary/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Пароль</Label>
                    <Input id="register-password" type="password" placeholder="Придумайте пароль" className="border-primary/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">Подтвердите пароль</Label>
                    <Input id="register-confirm" type="password" placeholder="Повторите пароль" className="border-primary/30" />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30">
                    <Icon name="UserPlus" className="mr-2" size={18} />
                    Зарегистрироваться
                  </Button>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </nav>

      <main className="pt-20">
        {currentSection === 'home' && renderHome()}
        {currentSection === 'news' && renderNews()}
        {currentSection === 'promo' && renderPromo()}
      </main>

      <footer className="bg-muted/5 border-t border-primary/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="Gamepad2" className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">MAJESTIC RP</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Лучший ролевой сервер с уникальными возможностями и маркетплейсом промокодов
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Навигация</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Главная</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Новости</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Промокоды</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Правила</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Сообщество</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Discord</li>
                <li className="hover:text-primary cursor-pointer transition-colors">VK</li>
                <li className="hover:text-primary cursor-pointer transition-colors">YouTube</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Форум</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Поддержка</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Помощь</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Донат</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Контакты</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary/20 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Majestic RP. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
