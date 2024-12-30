import ModulesModel from '~~/server/models/modules';
import {readBody} from 'h3';
import axios from 'axios';

export default defineEventHandler(
    async (ctx) => {
      try {
        const response = await axios.post(
          'https://randomall.ru/api/gens/10321',
          {}, // Equivalent to --data-raw "{}"
          {
            headers: {
              accept: 'application/json, text/plain, */*',
              'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
              'content-type': 'application/json',
              cookie:
                '_ym_uid=1735433334115534638; _ym_d=1735433334; _ym_isad=1; _gid=GA1.2.680443131.1735433336; _ga_XY0LZCZG3D=GS1.1.1735481925.4.0.1735481925.0.0.0; _ga=GA1.1.802226224.1735433335; _ym_visorc=w',
              origin: 'https://randomall.ru',
              priority: 'u=1, i',
              referer: 'https://randomall.ru/custom/gen/10321',
              'sec-ch-ua':
                '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
              'sec-ch-ua-mobile': '?0',
              'sec-ch-ua-platform': '"Windows"',
              'sec-fetch-dest': 'empty',
              'sec-fetch-mode': 'cors',
              'sec-fetch-site': 'same-origin',
              'user-agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            },
          }
        );
        let input = response.data.msg
        const result = {};
        // Regular expressions for each section
        const disasterRegex = /КАТАСТРОФА - (.+?)УГРОЗА/s;
        const threatRegex = /УГРОЗА - (.+?)БУНКЕР/s;
        const bunkerRegex = /БУНКЕР - (.+)/s;

        // Extract disaster information
        const disasterMatch = input.match(disasterRegex);
        if (disasterMatch) {
          result.catastrophe = disasterMatch[1].trim();
        }

        // Extract threat information
        const threatMatch = input.match(threatRegex);
        if (threatMatch) {
          result.threat = threatMatch[1].trim();
        }

        // Extract bunker information
        const bunkerMatch = input.match(bunkerRegex);
        if (bunkerMatch) {
          result.bunker = bunkerMatch[1].trim();
        }
        // Read the request body using the "readBody" function
        const body = await readBody(ctx);
        

        // Create a new instance of ModulesModel with the request body
        const newModule = new ModulesModel({ ...body, ...result });
        
        return await newModule.save()
        // Save the new module document to the database
        // return await newModule.save();
      } catch (e) {
      // Handle any errors
      // that occur during the process and log them to the console
        console.log(e);
      }
    },
);
