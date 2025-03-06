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
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.location}/${this.startDate}/${this.endDate}?key=MBK26J9HC5S79E2LG3RTL4R2W`,
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

    getWeatherInfo() {
        const weatherInfo = {
            location: this.weatherJSON.resolvedAddress,
            now: {
                condition: this.weatherJSON.currentConditions.conditions,
                icon: this.weatherJSON.currentConditions.icon,
                temp: this.weatherJSON.currentConditions.temp
            },
            today: {
                condition: this.weatherJSON.days[0].conditions,
                icon: this.weatherJSON.days[0].icon,
                temp: this.weatherJSON.days[0].temp
            },
            tomorrow: {
                condition: this.weatherJSON.days[1].conditions,
                icon: this.weatherJSON.days[1].icon,
                temp: this.weatherJSON.days[1].temp
            },
            next: {
                condition: this.weatherJSON.days[2].conditions,
                icon: this.weatherJSON.days[2].icon,
                temp: this.weatherJSON.days[2].temp
            }
        };
        return weatherInfo;
    }
}

export { Weather };