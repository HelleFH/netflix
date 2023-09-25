const service = {};


service.getFilms = async () => {
    try {
            
        const response = await fetch('films.json')
        const products = await response.json();
        return products;
    
    
    
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }

}

export default service;