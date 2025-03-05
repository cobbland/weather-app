class Weather {
    constructor(location, startDate = null, endDate = null) {
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    async getWeatherJSON() {
        let weather;
        if (this.startDate !== null && this.endDate !== null) {
            const weatherPromise = await fetch(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.location}?key=MBK26J9HC5S79E2LG3RTL4R2W`,
                {mode: 'cors'}
            )
            weather = await weatherPromise.json();
        } else {
            const weatherPromise = await fetch(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.location}?key=MBK26J9HC5S79E2LG3RTL4R2W`,
                {mode: 'cors'}
            )
            weather = await weatherPromise.json();
        }
        return weather;
    }

    async getTodaysWeather() {
        const weatherJSON = await this.getWeatherJSON();
        const todaysWeather = weatherJSON.days[0].conditions;
        return todaysWeather;
    }

}

export { Weather };