import React from 'react';
import type { View } from '../App';
import { ChatBubble, Sparkles, Moon, Scale, ShieldCheck, ClipboardList } from '../components/icons';

interface HomeViewProps {
  onNavigate: (view: View) => void;
}

// Keep the SectionCard component for the smaller cards
const SectionCard: React.FC<{
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}> = ({ id, icon, title, description, onClick }) => (
  <button
    id={id}
    onClick={onClick}
    className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-center shadow-lg transition-all transform hover:-translate-y-1 hover:shadow-amber-500/10 hover:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-400 h-full"
  >
    <div className="flex justify-center items-center mb-3 text-amber-400">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-100 mb-1">{title}</h3>
    <p className="text-slate-400 text-xs">{description}</p>
  </button>
);

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const sections: {
    view: View;
    icon: React.ReactNode;
    title: string;
    description: string;
  }[] = [
    {
      view: 'adhkar',
      icon: <ShieldCheck className="w-8 h-8" />,
      title: 'أدعية وأذكار',
      description: 'حصّن نفسك بالأدعية المأثورة.',
    },
    {
        view: 'ruqyah',
        icon: <ShieldCheck className="w-8 h-8" />,
        title: 'الرقية الشرعية',
        description: 'استشفِ بالقرآن من كل شر.',
    },
    {
      view: 'consultation',
      icon: <Scale className="w-8 h-8" />,
      title: 'الاستشارة الإسلامية',
      description: 'اسأل "فقيه" عن أمور دينك.',
    },
    {
      view: 'inspiration',
      icon: <Sparkles className="w-8 h-8" />,
      title: 'ركن الإلهام',
      description: 'بطاقات قرآنية مؤثرة وملهمة.',
    },
    {
      view: 'relax',
      icon: <Moon className="w-8 h-8" />,
      title: 'واحة السكينة',
      description: 'استرخِ مع تلاوات عطرة.',
    },
     {
      view: 'journal',
      icon: <ClipboardList className="w-8 h-8" />,
      title: 'دفتر هدايتي',
      description: 'سجّل رحلتك مع الآيات.',
    },
  ];

  const backgroundStyle = {
    backgroundImage: `
      radial-gradient(circle at 1px 1px, rgba(202, 138, 4, 0.1) 1px, transparent 0)
    `,
    backgroundSize: '1.5rem 1.5rem',
  };

  return (
    <div className="h-full flex flex-col p-4 sm:p-6 overflow-y-auto" style={backgroundStyle}>
        <div className="w-full max-w-5xl mx-auto animate-fade-in flex flex-col flex-grow">
            <header className="text-center pt-4 pb-8">
                <h1 className="text-5xl font-bold text-amber-300 font-serif mb-3">آية ترشدك</h1>
                <p className="text-lg text-slate-300">رفيقك الرقمي لإيجاد السكينة والطمأنينة في القرآن الكريم</p>
            </header>
            
            <main className="flex-grow">
              {/* Main CTA Card */}
              <div className="mb-8">
                <button
                  id="home-card-chat"
                  onClick={() => onNavigate('chat')}
                  className="w-full bg-slate-800/70 backdrop-blur-sm border-2 border-amber-400/50 rounded-2xl p-6 text-center shadow-2xl shadow-amber-900/20 transition-all transform hover:-translate-y-2 hover:shadow-amber-500/20 hover:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 flex flex-col sm:flex-row items-center gap-6"
                >
                  <div className="flex-shrink-0 text-amber-400 bg-amber-400/10 p-4 rounded-full">
                    <ChatBubble className="w-12 h-12" />
                  </div>
                  <div className="text-center sm:text-right">
                    <h2 className="text-2xl font-bold text-slate-100 mb-2">الدردشة الإرشادية</h2>
                    <p className="text-slate-300">هل تشعر بالضيق أو الحزن؟ تحدث مع مرشدك الروحي "هادي" ليطمئن قلبك بآيات القرآن.</p>
                  </div>
                </button>
              </div>

              {/* Other Sections */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {sections.map(section => (
                      <SectionCard
                          id={`home-card-${section.view}`}
                          key={section.view}
                          icon={section.icon}
                          title={section.title}
                          description={section.description}
                          onClick={() => onNavigate(section.view)}
                      />
                  ))}
              </div>
            </main>

            <footer className="text-center mt-12 py-4 text-slate-500 flex-shrink-0">
                <p>
                تم التطوير بواسطة الأستاذ 
                <span className="text-amber-500/80 mx-1">هادي الدليمي</span>
                </p>
                <p className="text-sm">لاتنساني من الدعاء لي ولوالدي</p>
            </footer>
        </div>
    </div>
  );
};
