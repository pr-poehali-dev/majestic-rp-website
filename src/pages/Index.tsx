import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

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
      title: 'Хэллоуин эвент завершён',
      date: '1 ноября 2025',
      description: 'Спасибо всем участникам! Победители получат эксклюзивные награды.',
      image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800'
    }
  ];

  const mediaItems = [
    {
      id: 1,
      title: 'Гонка по городу',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      category: 'Скриншоты'
    },
    {
      id: 2,
      title: 'Встреча банд',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
      category: 'События'
    },
    {
      id: 3,
      title: 'Закат у океана',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      category: 'Скриншоты'
    },
    {
      id: 4,
      title: 'Тюнинг автомобиля',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800',
      category: 'Тюнинг'
    },
    {
      id: 5,
      title: 'Концерт на площади',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
      category: 'События'
    },
    {
      id: 6,
      title: 'Полицейский рейд',
      image: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800',
      category: 'Экшн'
    }
  ];

  const renderHome = () => (
    <div className="min-h-screen">
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-background z-0"></div>
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3)'
          }}
        ></div>
        
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 glow-purple">
            MAJESTIC RP
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
            Создай свою историю в мире безграничных возможностей
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 border-glow">
              <Icon name="Gamepad2" className="mr-2" size={20} />
              Начать играть
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-primary/50 hover:bg-primary/10">
              <Icon name="Info" className="mr-2" size={20} />
              Узнать больше
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-card border-primary/30 hover:border-primary transition-all hover:border-glow animate-scale-in">
            <CardHeader>
              <Icon name="Users" className="w-12 h-12 mb-4 text-primary" />
              <CardTitle>Активное комьюнити</CardTitle>
              <CardDescription>Более 10,000 игроков онлайн каждый день</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card border-secondary/30 hover:border-secondary transition-all hover:border-glow animate-scale-in" style={{animationDelay: '0.1s'}}>
            <CardHeader>
              <Icon name="Trophy" className="w-12 h-12 mb-4 text-secondary" />
              <CardTitle>Уникальные ивенты</CardTitle>
              <CardDescription>Регулярные турниры и конкурсы с призами</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-card border-accent/30 hover:border-accent transition-all hover:border-glow animate-scale-in" style={{animationDelay: '0.2s'}}>
            <CardHeader>
              <Icon name="Zap" className="w-12 h-12 mb-4 text-accent" />
              <CardTitle>Стабильность</CardTitle>
              <CardDescription>Высокая производительность без лагов</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 glow-blue">Последние новости</h2>
          <p className="text-muted-foreground">Будьте в курсе всех событий</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {newsItems.slice(0, 3).map((news) => (
            <Card key={news.id} className="overflow-hidden bg-card border-primary/20 hover:border-primary/50 transition-all cursor-pointer group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
              </div>
              <CardHeader>
                <div className="text-sm text-primary mb-2">{news.date}</div>
                <CardTitle className="text-xl">{news.title}</CardTitle>
                <CardDescription>{news.description}</CardDescription>
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
        <h1 className="text-5xl font-bold mb-4 glow-purple">Новости</h1>
        <p className="text-muted-foreground text-lg">Все обновления и события сервера</p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {newsItems.map((news) => (
          <Card key={news.id} className="overflow-hidden bg-card border-primary/20 hover:border-primary transition-all animate-scale-in">
            <div className="md:flex">
              <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform hover:scale-110"
                />
              </div>
              <div className="md:w-2/3">
                <CardHeader>
                  <div className="text-sm text-primary mb-2">{news.date}</div>
                  <CardTitle className="text-2xl mb-2">{news.title}</CardTitle>
                  <CardDescription className="text-base">{news.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
                    Читать полностью
                    <Icon name="ArrowRight" className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMedia = () => (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl font-bold mb-4 glow-blue">Медиа-галерея</h1>
        <p className="text-muted-foreground text-lg">Лучшие моменты из игры</p>
      </div>

      <Tabs defaultValue="all" className="w-full max-w-6xl mx-auto">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="screenshots">Скриншоты</TabsTrigger>
          <TabsTrigger value="events">События</TabsTrigger>
          <TabsTrigger value="tuning">Тюнинг</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="grid md:grid-cols-3 gap-6">
          {mediaItems.map((item) => (
            <Card key={item.id} className="overflow-hidden bg-card border-secondary/20 hover:border-secondary transition-all group cursor-pointer animate-scale-in">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <div className="text-xs text-secondary mb-1">{item.category}</div>
                    <div className="font-semibold">{item.title}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="screenshots" className="grid md:grid-cols-3 gap-6">
          {mediaItems.filter(item => item.category === 'Скриншоты').map((item) => (
            <Card key={item.id} className="overflow-hidden bg-card border-secondary/20 hover:border-secondary transition-all group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <div className="text-xs text-secondary mb-1">{item.category}</div>
                    <div className="font-semibold">{item.title}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="events" className="grid md:grid-cols-3 gap-6">
          {mediaItems.filter(item => item.category === 'События').map((item) => (
            <Card key={item.id} className="overflow-hidden bg-card border-secondary/20 hover:border-secondary transition-all group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <div className="text-xs text-secondary mb-1">{item.category}</div>
                    <div className="font-semibold">{item.title}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="tuning" className="grid md:grid-cols-3 gap-6">
          {mediaItems.filter(item => item.category === 'Тюнинг').map((item) => (
            <Card key={item.id} className="overflow-hidden bg-card border-secondary/20 hover:border-secondary transition-all group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <div className="text-xs text-secondary mb-1">{item.category}</div>
                    <div className="font-semibold">{item.title}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentSection('home')}>
            <Icon name="Gamepad2" className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold glow-purple">MAJESTIC</span>
          </div>

          <div className="hidden md:flex gap-6">
            <Button 
              variant={currentSection === 'home' ? 'default' : 'ghost'}
              onClick={() => setCurrentSection('home')}
              className={currentSection === 'home' ? 'bg-primary hover:bg-primary/90' : ''}
            >
              <Icon name="Home" className="mr-2" size={18} />
              Главная
            </Button>
            <Button 
              variant={currentSection === 'news' ? 'default' : 'ghost'}
              onClick={() => setCurrentSection('news')}
              className={currentSection === 'news' ? 'bg-primary hover:bg-primary/90' : ''}
            >
              <Icon name="Newspaper" className="mr-2" size={18} />
              Новости
            </Button>
            <Button 
              variant={currentSection === 'media' ? 'default' : 'ghost'}
              onClick={() => setCurrentSection('media')}
              className={currentSection === 'media' ? 'bg-primary hover:bg-primary/90' : ''}
            >
              <Icon name="Image" className="mr-2" size={18} />
              Медиа
            </Button>
          </div>

          <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 border-glow">
                <Icon name="User" className="mr-2" size={18} />
                Войти
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-primary/30">
              <DialogHeader>
                <DialogTitle className="text-2xl glow-purple">
                  {authMode === 'login' ? 'Авторизация' : 'Регистрация'}
                </DialogTitle>
                <DialogDescription>
                  {authMode === 'login' 
                    ? 'Войдите в свой аккаунт для доступа к профилю' 
                    : 'Создайте новый аккаунт для начала игры'}
                </DialogDescription>
              </DialogHeader>

              <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as 'login' | 'register')} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
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
                  <Button className="w-full bg-primary hover:bg-primary/90">
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
                  <Button className="w-full bg-primary hover:bg-primary/90">
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
        {currentSection === 'media' && renderMedia()}
      </main>

      <footer className="bg-muted/10 border-t border-primary/20 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Gamepad2" className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold">MAJESTIC RP</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Лучший ролевой сервер с уникальными возможностями
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Навигация</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Главная</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Новости</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Медиа</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Правила</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Сообщество</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Discord</li>
                <li className="hover:text-primary cursor-pointer transition-colors">VK</li>
                <li className="hover:text-primary cursor-pointer transition-colors">YouTube</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Форум</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Поддержка</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Правила</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Донат</li>
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
