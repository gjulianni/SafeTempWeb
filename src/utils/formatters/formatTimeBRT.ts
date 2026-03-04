const formatTimeBRT = (timestamp: string | Date) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
    });
};

export default formatTimeBRT;

