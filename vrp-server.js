let callbacks = [];

identify = GetCurrentResourceName();

on('vRP'+':' + identify +':proxy_res', (rid,rets)=>{
    if(callbacks[rid]){
        let retorno = JSON.parse(rets)
        callbacks[rid](retorno);
        callbacks[rid] = null;
    }
})

let ProxyVRP = function(){

    this.addUserGroup = function(user_id, group){
        let args = [...arguments];
        return chamarVRPProxy("addUserGroup",args);
    }

    this.hasPermission = function(user_id, permission){
        let args = [...arguments];
        return chamarVRPProxy("hasPermission", args);
    }
    
    this.getUserId = function(source){
        let args = [...arguments];
        return chamarVRPProxy("getUserId",args);
    }

    this.getUsers = function(){
        let args = [...arguments];
        return chamarVRPProxy("getUsers",args);
    }

    this.getUsersByPermission = function(permission){
        let args = [...arguments];
        return chamarVRPProxy("getUsersByPermission",args);
    }

    this.getUserGroups = function(user_id){
        let args = [...arguments];
        return chamarVRPProxy("getUserGroups",args);
    }

    this.getUserSource = function(userId){
        let args = [...arguments];
        return chamarVRPProxy("getUserSource",args);
    }

    this.hasGroup = function(userId, group){
        let args = [...arguments];
        return chamarVRPProxy("hasGroup",args);
    }
    
    this.isBanned = function(){
        let args = [...arguments];
        return chamarVRPProxy("isBanned",args);
    }

    this.isWhitelisted = function(){
        let args = [...arguments];
        return chamarVRPProxy("isWhitelisted",args);
    }

    this.removeUserGroup = function(user_id, group){
        let args = [...arguments];
        return chamarVRPProxy("removeUserGroup",args);
    }

    this.setBanned = function(user_id, banned){
        let args = [...arguments];
        return chamarVRPProxy("setBanned",args);
    }

    this.prepare = function(user_id, banned){
        let args = [...arguments];
        return chamarVRPProxy("prepare",args);
    }

    this.query = function(user_id, banned){
        let args = [...arguments];
        return chamarVRPProxy("query",args);
    }

    this.execute = function(user_id, banned){
        let args = [...arguments];
        return chamarVRPProxy("execute",args);
    }

    // Money

    this.getMoney = function(user_id){
        let args = [...arguments];
        return chamarVRPProxy("getMoney",args);
    }

    this.setMoney = function(user_id, value){
        let args = [...arguments];
        return chamarVRPProxy("setMoney",args);
    }

    this.removeMoney = function(user_id){
        let args = [...arguments];
        return chamarVRPProxy("removeMoney",args);
    }

    this.tryPayment = function(user_id, amount){
        let args = [...arguments];
        return chamarVRPProxy("tryPayment",args);
    }

    this.giveMoney = function(user_id, amount){
        let args = [...arguments];
        return chamarVRPProxy("giveMoney",args);
    }

    this.getBankMoney = function(user_id){
        let args = [...arguments];
        return chamarVRPProxy("getBankMoney",args);
    }

    this.setBankMoney = function(user_id, value){
        let args = [...arguments];
        return chamarVRPProxy("setBankMoney",args);
    }

    this.giveBankMoney = function(user_id, amount){
        let args = [...arguments];
        return chamarVRPProxy("giveBankMoney",args);
    }

    this.tryWithdraw = function(user_id, amount){
        let args = [...arguments];
        return chamarVRPProxy("tryWithdraw",args);
    }

    this.tryDeposit = function(user_id, amount){
        let args = [...arguments];
        return chamarVRPProxy("tryDeposit",args);
    }

    this.tryFullPayment = function(user_id, amount){
        let args = [...arguments];
        return chamarVRPProxy("tryFullPayment",args);
    }
    
    // Inventory

    this.giveInventoryItem = function(user_id, idname, amount){
        let args = [...arguments];
        return chamarVRPProxy("giveInventoryItem",args);
    }

    this.tryGetInventoryItem = function(user_id, idname, amount){
        let args = [...arguments];
        return chamarVRPProxy("tryGetInventoryItem",args);
    }

    this.getInventoryItemAmount = function(user_id, idname){
        let args = [...arguments];
        return chamarVRPProxy("getInventoryItemAmount",args);
    }

    this.getInventory = function(user_id){
        let args = [...arguments];
        return chamarVRPProxy("getInventory",args);
    }

    this.getInventoryWeight = function(user_id){
        let args = [...arguments];
        return chamarVRPProxy("getInventoryWeight",args);
    }

    this.getInventoryMaxWeight = function(user_id){
        let args = [...arguments];
        return chamarVRPProxy("getInventoryMaxWeight",args);
    }

    function chamarVRPProxy(nomeEvento, args){
        return new Promise(res => { 
            let num = callbacks.push(res);
            let rid = num-1;
    
            dados = { args: args,identifier: identify,rid: rid}
            let json = JSON.stringify(dados)
            
            emit("vRP"+":proxy",nomeEvento, '', '', rid,json)
        });
    }

}

module.exports = {ProxyVRP};
module.exports.default = {ProxyVRP};


exports("vrp", ProxyVRP);
