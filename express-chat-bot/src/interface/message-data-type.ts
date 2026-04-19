export interface MessageReceivedData {
    event: string;
    instance: string;
    data?: {
        key?: {
            id?: string;
            remoteJid?: string;
            fromMe?: boolean;
            participant?: string;
        };
        pushName?: string;
        message?: {
            conversation?: string;
        };
        messageType: string;
        messageTimestamp: number;
    };
    sender: string;
}

// {
//     "event": "messages.upsert",
//     "instance": "user-01",
//     "data": {
//       "key": {
//         "remoteJid": "558499292307@s.whatsapp.net",
//         "remoteJidAlt": "558499292307@s.whatsapp.net",
//         "fromMe": true,
//         "id": "3A24441E5EAA5EED1071",
//         "participant": "",
//         "addressingMode": "lid"
//       },
//       "pushName": "Caio Rafael",
//       "status": "SERVER_ACK",
//       "message": {
//         "conversation": "Iai fera"
//       },
//       "messageType": "conversation",
//       "messageTimestamp": 1776456131,
//       "instanceId": "5761bad2-c237-4f0e-bd31-4a3910f3a6ec",
//       "source": "ios"
//     },
//     "destination": "https://0353-2804-29b8-5006-dbb0-861-bb9-613c-8dc8.ngrok-free.app/api/v1/webhook",
//     "date_time": "2026-04-17T17:02:11.608Z",
//     "sender": "558499292307@s.whatsapp.net",
//     "server_url": "http://localhost:8080",
//     "apikey": "D2A8074E-3DFE-4A7F-88D4-9A14610CB104"
//   }