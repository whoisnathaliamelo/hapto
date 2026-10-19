interface PhoneFrameProps {
  children: React.ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div id="phone-frame">
      {/* 1. Dynamic Island / Speaker */}
      <div id="phone-notch">
        <span />
      </div>

      {/* 2. Barra de Status do Sistema Operacional */}
      <div id="phone-status-bar">
        <span>09:41</span>
        <div>
          <span>5G</span>
          <span>100%</span>
        </div>
      </div>

      {/* 3. Viewport (área da tela onde o app e as zonas são renderizados) */}
      <div id="phone-screen-viewport">
        {children}
      </div>

      {/* 4. Barra de navegação por gestos do sistema (Home Indicator) */}
      <div id="phone-home-indicator">
        <span />
      </div>
    </div>
  );
}
