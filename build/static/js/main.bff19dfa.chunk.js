(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{19:function(t,e,a){t.exports={Day:"Day_Day__3wB_h"}},20:function(t,e,a){t.exports=a(45)},26:function(t,e,a){},27:function(t,e,a){},45:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),i=a(18),l=a.n(i),s=(a(26),a(2)),c=a(3),o=a(6),h=a(5),u=a(4),d=a(7),p=(a(27),a(19)),m=a.n(p),w=function(t){function e(t){var a;return Object(s.a)(this,e),(a=Object(o.a)(this,Object(h.a)(e).call(this,t))).state={date:null,icon:null},a}return Object(d.a)(e,t),Object(c.a)(e,[{key:"componentWillMount",value:function(){var t=new Date(this.props.date).getDay();0===t?this.setState({date:"Monday"}):1===t?this.setState({date:"Tuesday"}):2===t?this.setState({date:"Wednesday"}):3===t?this.setState({date:"Thursday"}):4===t?this.setState({date:"Friday"}):5===t?this.setState({date:"Saturday"}):6===t&&this.setState({date:"Sunday"})}},{key:"render",value:function(){return r.a.createElement("div",{className:m.a.Day},r.a.createElement("div",null,this.props.temperature,"\xb0C"),r.a.createElement("div",null,this.state.date),r.a.createElement("div",null,r.a.createElement("img",{src:"../../assets/svg/".concat(this.props.iconUrl,".svg"),alt:this.props.icon})))}}]),e}(n.Component),g=a(8),y=a.n(g),v=function(t){function e(t){var a;return Object(s.a)(this,e),(a=Object(o.a)(this,Object(h.a)(e).call(this,t))).getWeatherData=function(){a.getCurrentWeatherData(),a.getWeeklyWeatherData()},a.getCurrentWeatherData=function(){var t="https://api.openweathermap.org/data/2.5/find?q=".concat(a.state.value,"&units=metric&appid=").concat(a.state.API_key);y.a.get(t).then(function(t){var e=t.data;a.setState({weatherData:e})}).catch(function(t){a.setState({weatherData:null}),console.log(t)})},a.getWeeklyWeatherData=function(){var t="https://api.openweathermap.org/data/2.5/forecast?q=".concat(a.state.value,"&units=metric&appid=").concat(a.state.API_key);y.a.get(t).then(function(t){var e=t.data;a.setState({weeklyWeatherData:e})}).catch(function(t){console.log(t)})},a.handleChange=function(t){a.setState({value:t.target.value})},a.state={API_key:"7c322888d234d1fc7dc225ad7e3e1e03",weatherData:null,weeklyWeatherData:null,value:null},a.handleChange=a.handleChange.bind(Object(u.a)(a)),a}return Object(d.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){var t,e,a,n,i,l,s,c=this;if(this.state.weeklyWeatherData){var o=this.state.weeklyWeatherData.list.filter(function(t){return t.dt_txt.split(" ")[1]===c.state.weeklyWeatherData.list[0].dt_txt.split(" ")[1]});console.log(o),t=o.map(function(t,e){return r.a.createElement(w,{date:t.dt_txt.split(" ")[0],key:e,temperature:Math.trunc(t.main.temp),iconUrl:t.weather[0].icon})})}return this.state.weatherData&&this.state.weatherData.count>0&&(e=r.a.createElement("p",null,this.state.weatherData.list[0].name),a=r.a.createElement("p",null,Math.trunc(this.state.weatherData.list[0].main.temp),"\xb0C"),n=r.a.createElement("p",null,this.state.weatherData.list[0].main.humidity,"%"),i=r.a.createElement("p",null,this.state.weatherData.list[0].weather[0].description),l="http://openweathermap.org/img/wn/".concat(this.state.weatherData.list[0].weather[0].icon,"@2x.png"),s=r.a.createElement("img",{src:l,alt:"alt text"})),r.a.createElement("div",{className:"App"},r.a.createElement("input",{type:"text",placeholder:"Ime grada",onChange:this.handleChange}),r.a.createElement("button",{onClick:this.getWeatherData},"Search"),r.a.createElement("h1",null,a),r.a.createElement("h2",null,e),n,i,s,r.a.createElement("div",{className:"Daily-Data"},t))}}]),e}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[20,1,2]]]);
//# sourceMappingURL=main.bff19dfa.chunk.js.map