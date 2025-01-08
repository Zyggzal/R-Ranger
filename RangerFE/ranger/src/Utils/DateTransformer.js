module.exports = {
    DateToAgo: (date) =>{
        const d = new Date(date)
        const n = new Date()

        let diff = Math.floor(n.getFullYear() - d.getFullYear());
        if(diff > 0) {
            return `${diff}yrs ago`
        }
        diff = Math.floor((n.getMonth() + (n.getFullYear() * 12)) - (d.getMonth() + (d.getFullYear() * 12)))
        if(diff > 0) {
            return `${diff}m ago`
        }
        diff = Math.floor((n.getTime() - d.getTime()) / (24*3600*1000*7))
        if(diff > 0) {
            return `${diff}w ago`
        }
        diff = Math.floor((n.getTime() - d.getTime())/(24*3600*1000))
        if(diff > 0) {
            return `${diff}d ago`
        }
        diff = Math.floor((n.getTime() - d.getTime())/(3600*1000))
        if(diff > 0) {
            return `${diff}hrs ago`
        } 
        diff = Math.floor((n.getTime() - d.getTime())/(60*1000))
        if(diff > 0) {
            return `${diff}min ago`
        }
        
        return 'now'
    },

    DateToFuture: (date) =>{
        const n = new Date(date)
        const d = new Date()

        let diff = Math.floor(n.getFullYear() - d.getFullYear());
        if(diff > 0) {
            return `${diff}yrs`
        }
        diff = Math.floor((n.getMonth() + (n.getFullYear() * 12)) - (d.getMonth() + (d.getFullYear() * 12)))
        if(diff > 0) {
            return `${diff}m`
        }
        diff = Math.floor((n.getTime() - d.getTime()) / (24*3600*1000*7))
        if(diff > 0) {
            return `${diff}w`
        }
        diff = Math.floor((n.getTime() - d.getTime())/(24*3600*1000))
        if(diff > 0) {
            return `${diff}d`
        }
        diff = Math.floor((n.getTime() - d.getTime())/(3600*1000))
        if(diff > 0) {
            return `${diff}hrs`
        } 
        diff = Math.floor((n.getTime() - d.getTime())/(60*1000))
        if(diff > 0) {
            return `${diff}min`
        }
        
        return Math.floor((n.getTime() - d.getTime())/(3600*1000))
    },

    DateFromUTC: (date) => {
        return new Date(date.getTime() - date.getTimezoneOffset()*60*1000);   
    }
} 