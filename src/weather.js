class Weather {
    constructor(location, startDate = null, endDate = null) {
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
        this.weatherJSON;
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
        console.log(weather)
        return weather;
    }

    async getTodayWeather() {
        const weatherJSON = await this.getWeatherJSON();
        const todayWeather = weatherJSON.days[0].conditions;
        return todayWeather;
    }

    async getNowWeather() {
        const weatherJSON = await this.getWeatherJSON();
        const nowWeather = weatherJSON.currentConditions.conditions;
        return nowWeather;
    }

    async getNowTemp() {
        const weatherJSON = await this.getWeatherJSON();
        const nowTemp = weatherJSON.currentConditions.temp;
        return nowTemp;
    }

    async getNowIcon() {
        const weatherJSON = await this.getWeatherJSON();
        const nowIcon = weatherJSON.currentConditions.icon;
        return nowIcon;
    }

}

export { Weather };