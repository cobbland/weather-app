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
        this.weatherJSON = weather;
        return weather;
    }

    getLocation() {
        const weatherLocation = this.weatherJSON.resolvedAddress;
        return weatherLocation;
    }

    getTodayWeather() {
        // const weatherJSON = await this.getWeatherJSON();
        const todayWeather = this.weatherJSON.days[0].conditions;
        return todayWeather;
    }

    getNowWeather() {
        // const weatherJSON = await this.getWeatherJSON();
        const nowWeather = this.weatherJSON.currentConditions.conditions;
        return nowWeather;
    }

    getNowTemp() {
        // const weatherJSON = await this.getWeatherJSON();
        const nowTemp = this.weatherJSON.currentConditions.temp;
        return nowTemp;
    }

    getNowIcon() {
        // const weatherJSON = await this.getWeatherJSON();
        const nowIcon = this.weatherJSON.currentConditions.icon;
        return nowIcon;
    }

}

export { Weather };