export const generateColors = (count: number) => {
  
  const colors = [
    'rgba(220, 30, 220, 0.8)',   // Magenta 
    'rgba(139, 92, 246, 0.8)',   // Violeta
    'rgba(59, 130, 246, 0.8)',   // Azul
    'rgba(34, 197, 94, 0.8)',    // Verde
    'rgba(236, 72, 153, 0.8)',   // Rosa
    'rgba(239, 68, 68, 0.8)',    // Rojo
    'rgba(168, 85, 247, 0.8)',   // Púrpura
    'rgba(14, 165, 233, 0.8)',   // Azul cielo
    'rgba(52, 211, 153, 0.8)',   // Verde agua
    'rgba(251, 113, 133, 0.8)',  // Rosa coral
  ];

  const borderColors = colors.map(color => color.replace('0.8', '1'));
  const hoverColors = colors.map(color => color.replace('0.8', '1'));

  return {
    backgroundColor: colors.slice(0, count),
    borderColor: borderColors.slice(0, count),
    hoverBackgroundColor: hoverColors.slice(0, count),
  };
};