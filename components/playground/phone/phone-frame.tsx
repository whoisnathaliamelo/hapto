import { Battery, Wifi } from "lucide-react";

interface PhoneFrameProps {
  children: React.ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="relative mx-auto w-[310px] sm:w-[330px] transition-transform duration-300">
      {/* Moldura física de smartphone moderna */}
      <div className="relative h-[610px] sm:h-[640px] w-full rounded-[3rem] border-[4px] border-line/90 bg-surface p-3.5 shadow-2xl shadow-primary/10 transition-shadow duration-300 hover:shadow-primary/20 flex flex-col justify-between">
        
        {/* Dynamic Island / Câmera Frontal */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex h-4 w-24 items-center justify-center rounded-full bg-ink/90 px-2 shadow-2xs">
          <div className="size-2 rounded-full bg-muted/30 mr-2" />
          <div className="h-1.5 w-8 rounded-full bg-muted/20" />
        </div>

        {/* Barra de Status do Sistema Operacional (iOS/Android feel) */}
        <div className="relative z-20 flex items-center justify-between px-5 pt-1.5 pb-2 text-[11px] font-semibold text-muted select-none">
          <span>09:41</span>
          <div className="flex items-center gap-1.5 text-muted">
            <Wifi className="size-3" />
            <span className="text-[10px]">5G</span>
            <Battery className="size-3.5" />
          </div>
        </div>

        {/* Viewport da Tela Interna com cantos arredondados */}
        <div className="relative flex flex-1 flex-col justify-between rounded-[2.25rem] border border-line/40 bg-bg overflow-hidden shadow-inner">
          {children}
        </div>

        {/* Home indicator bar (Gesto de fechar app) */}
        <div className="mx-auto mt-2 h-1 w-28 shrink-0 rounded-full bg-muted/40 transition-colors" />
      </div>
    </div>
  );
}

