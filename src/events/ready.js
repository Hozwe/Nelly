module.exports = client => {
    console.log('Nelly is ready!');
    
    client.user.setPresence({
        status: 'dnd',
        activity: {
            name: '!help - Nelly',
            type: 'PLAYING'
        }
    });
}
