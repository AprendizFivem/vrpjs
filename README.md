1. Instalação

 O arquivo vrp-server.js é o arquivo que será encarrecado de realizar as chamadas ao VRP.
Porém, além da inclusão do arquivo, você deve alterar o arquivo Proxy.lua da sua base, 
vai trocar a função chamada addInterface.

```
function Proxy.addInterface(name,itable)
    AddEventHandler(name..":proxy",function(member,args,identifier,rid, JSONJS)
        local f = itable[member]
        local rets = {}
        if JSONJS then
            local json = json.decode(JSONJS)
            args = json["args"]
            if not args then
                args={}
            end 
            identifier = json["identifier"]
            rid = json["rid"]
        end
        if type(f) == "function" then
            rets = {f(table.unpack(args,1,table.maxn(args)))}
        end
        if rid >= 0 then
            if JSONJS then
                rets = table.unpack(rets,1,table.maxn(rets))
                rets = json.encode(rets)
            end
            TriggerEvent(name..":"..identifier..":proxy_res",rid,rets)
        end
    end)
end
```

2. Como usar, exemplo de arquivo server.js:

```
let {ProxyVRP} = require('./vrp-server');

// Criando Proxy VRP
let vrp = new ProxyVRP();


// Está configurado para apenas usuários que tenham a permissão "dono.permission"
// Para usar esse comando utilize: /fogoadmin ID_USUARIO

RegisterCommand('fogoadmin', async(source, args)=>{
    let user_id = await vrp.getUserId(source);
    
    let user_id_alvo = parseInt(args[0]);
    
    let nsource = await vrp.getUserSource(user_id_alvo)

    let temPermissao = await vrp.hasPermission(user_id, "dono.permissao")

    console.log('O usuário ' + user_id + "tem permissão ? " + temPermissao)
    if(temPermissao){
        emitNet('colocarfogo', nsource)
    }

    
})


// Explicação do Código
// Linha 11: Recupera o ID do usuário que disparou o comando, isso é feito através do SOURCE(identificador temporário)
// Linha 13: Transforma o texto recebido(args[0]) em número. OBS: nesse caso o texto recebido é o ID do usuário que irá colocar fogo
// Linha 15: Recupera o source(identificador temporário) de outro jogador pelo USER_ID informado no comando
// Linha 17: Verifica se o usuário tem a pesmissão necessária
// Linha 20: Dispara um evento no client do usuário que iremos colocar fogo.

````


2.1 arquivo client.js
```
onNet('colocarfogo', ()=>{
    let ped = PlayerPedId()
    StartEntityFire(ped);

    setTimeout(()=>{
        StopEntityFire(PlayerPedId());
    }, 3000);
})
```
