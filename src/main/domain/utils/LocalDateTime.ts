class LocalDateTime {
    now(): string {
        return new Date().toLocaleString('se-SE', { timeZone: 'America/Sao_Paulo' });
    }
}

export default new LocalDateTime();
