
import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.interface";
import { of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    private _employees = [
        {
            id: "593707516865cd044e87ef00",
            address: {
                "city": "Oud-Turnhout",
                "country": "Belgie",
                "line1": "Berkendreef 3",
                "state": "Antwerpen",
                "zip_code": "2360"
            },
            bank_account: {
                "bic": "KREDBEBB",
                "iban": "BE05 7340 3032 8875"
            },
            birth_date: "1977-01-30T00:00:00.000Z",
            birth_place: "Lommel",
            civil_status: "married",
            deleted: false,
            emergency_contact: {
                "name": "Ingrid Vandenput",
                "phone": "+32 478 97 80 42",
                "relation": "spouse"
            },
            first_name: "Bart",
            gender: "male",
            identity_card_number: "592-8049126-50",
            language: "dutch",
            last_name: "Lenaerts",
            nationality: "belgian",
            position: "Chief Executive Gladiator",
            social_security_number: "77.01.30-037.08",
            teams: ["Management"],
            work_contact: {
                email: "bart@codious.io",
                mobile: "+32 473 49 39 51"
            }
        },
        {
            id: "593707516865cd044e87ef02",
            address: {
                "city": "Tielt-Winge",
                "country": "Beglië",
                "line1": "Reststraat 68",
                "state": "Leuven",
                "zip_code": "3390"
            },
            bank_account: {
                "bic": "",
                "iban": ""
            },
            birth_date: "1984-08-03T00:00:00.000Z",
            birth_place: "Leuven",
            civil_status: "unmarried",
            deleted: false,
            emergency_contact: {
                "name": "",
                "phone": "",
                "relation": ""
            },
            first_name: "Tijl",
            gender: "male",
            identity_card_number: "592-4814166-40",
            language: "dutch",
            last_name: "Claessens",
            nationality: "belgian",
            position: "Full Stack Developer",
            social_security_number: "84.08.03367.05",
            teams: ["Management"],
            work_contact: {
                email: "tijl@codious.io",
                mobile: "0491 61 42 96"
            }
        },
        {
            id: "593707516865cd044e87ef01",
            address: {
                "city": "Turnhout",
                "country": "België",
                "line1": "Guldensporenlei 16 ",
                "state": "Antwerpen",
                "zip_code": "2300"
            },
            bank_account: {
                "bic": "BNAGBEBB",
                "iban": "BE17 1325 4795 1021"
            },
            birth_date: "1985-03-18T00:00:00.000Z",
            birth_place: "Turnhout",
            civil_status: "legally cohabiting",
            deleted: false,
            emergency_contact: {
                "name": "Jasmien De Doncker",
                "phone": "",
                "relation": "Partner"
            },
            first_name: "Pieter",
            gender: "male",
            identity_card_number: "592-1055087-02",
            language: "dutch",
            last_name: "Willemsen",
            nationality: "belgian",
            position: "Full Stack Developer",
            social_security_number: "85.13.18-109.90",
            teams: ["Employee"],
            work_contact: {
                email: "pieter@codious.io",
                mobile: "+32 474 38 72 95"
            }
        },
        {
            id: "593707516865cd044e87ef03",
            address: {
                "city": "Hasselt",
                "country": "België",
                "line1": "Sportstraat 3A",
                "state": "Limburg",
                "zip_code": "3500"
            },
            bank_account: {
                "bic": "KREDBEBB",
                "iban": "BE81 7360 4409 2224"
            },
            birth_date: "1988-09-09T00:00:00.000Z",
            birth_place: "Leuven",
            civil_status: "Legally cohabiting",
            deleted: false,
            emergency_contact: {
                "name": "Yanick Fanton ",
                "phone": "",
                "relation": "Partner"
            },
            first_name: "Joris",
            gender: "male",
            identity_card_number: "592-0332806-80",
            language: "dutch",
            last_name: "Michielsen",
            nationality: "belgian",
            position: "Full Stack Developer",
            social_security_number: "88.09.09-183.03",
            teams: ["Employee"],
            work_contact: {
                email: "joris@codious.io",
                mobile: "0032 473 29 97 50"
            }
        },
        {
            id: "593707516865cd044e87ef04",
            address: {
                "city": "Langdorp",
                "country": "België",
                "line1": "Venneloopstraat",
                "state": "Aarschot",
                "zip_code": "3201"
            },
            bank_account: {
                "bic": "BPOTBEB1",
                "iban": "BE95 0001 7089 0758"
            },
            birth_date: "1982-09-30T00:00:00.000Z",
            birth_place: "Aarschot",
            civil_status: "Unmarried",
            deleted: false,
            emergency_contact: {
                "name": "",
                "phone": "",
                "relation": ""
            },
            first_name: "Hans",
            gender: "male",
            identity_card_number: "592-5296616-12",
            language: "dutch",
            last_name: "Brems",
            nationality: "belgian",
            position: "Full Stack Developer",
            social_security_number: "820-930065-44",
            teams: ["Employee"],
            work_contact: {
                email: "hans@codious.io",
                mobile: "0488 90 88 33"
            }
        },
        {
            id: "593707516865cd044e87ef05",
            address: {
                "city": "Diepenbeek",
                "country": "België",
                "line1": "Vlierstraat 65",
                "state": "Limburg",
                "zip_code": "3590"
            },
            bank_account: {
                "bic": "BBRUBEBB",
                "iban": "BE90 3350 2294 88 32"
            },
            birth_date: "1987-07-24T00:00:00.000Z",
            birth_place: "GENK",
            civil_status: "legally cohabiting ",
            deleted: false,
            emergency_contact: {
                "name": "Cindy Houben",
                "phone": "",
                "relation": "Partner"
            },
            first_name: "Kevin",
            gender: "male",
            identity_card_number: "592-0228028-62",
            language: "dutch",
            last_name: "Gerits",
            nationality: "belgian",
            position: "System Engineer",
            social_security_number: "87.07.24-225.58",
            teams: ["Employee"],
            work_contact: {
                email: "kevin@codious.io",
                mobile: "0483 20 44 88"
            }
        },
        {
            id: "593707516865cd044e87ef06",
            address: {
                "city": "Kasterlee",
                "country": "België",
                "line1": "Turnhoutsebaan 87/4",
                "state": "Antwerpen",
                "zip_code": "2460"
            },
            bank_account: {
                "bic": "GKCCBEBBB",
                "iban": "BE54 0634 3720 4697"
            },
            birth_date: "1989-04-18T00:00:00.000Z",
            birth_place: "Turnhout",
            civil_status: "unmarried",
            deleted: false,
            emergency_contact: {
                "name": "",
                "phone": "",
                "relation": ""
            },
            first_name: "Yannick",
            gender: "male",
            identity_card_number: "591-9504859-28",
            language: "dutch",
            last_name: "Luijten",
            nationality: "belgian",
            position: "Full Stack Developer",
            social_security_number: "89.04.18-378.08",
            teams: ["Employee"],
            work_contact: {
                email: "yannick@codious.io",
                mobile: "0032 476 43 22 93"
            }
        },
        {
            id: "593707516865cd044e87ef07",
            address: {
                "city": "Oudsbergen",
                "country": "België",
                "line1": "Weg Naar Zwartberg 196",
                "state": "Limburg",
                "zip_code": "3660"
            },
            bank_account: {
                "bic": "GEBABEBB",
                "iban": "BE31 0013 6258 3955"
            },
            birth_date: "1989-10-20T00:00:00.000Z",
            birth_place: "Genk",
            civil_status: "unmarried ",
            deleted: false,
            emergency_contact: {
                "name": "",
                "phone": "",
                "relation": ""
            },
            first_name: "Stef",
            gender: "male",
            identity_card_number: "592-1389491-47",
            language: "dutch",
            last_name: "Leurs",
            nationality: "belgian",
            position: "Full Stack Developer",
            social_security_number: "89.10.20-207.65",
            teams: ["Employee"],
            work_contact: {
                email: "stef@codious.io",
                mobile: "0032 496 15 79 66"
            }
        },
        {
            id: "593707516865cd044e87ef08",
            address: {
                "city": "Putte",
                "country": "België",
                "line1": "Spoelstraat 9",
                "state": "Antwerpen",
                "zip_code": "2580"
            },
            bank_account: {
                "bic": "BBRUBEBB",
                "iban": "BE19 3770 8058 5112"
            },
            birth_date: "1992-02-18T00:00:00.000Z",
            birth_place: "Wilrijk",
            civil_status: "Married",
            deleted: false,
            emergency_contact: {
                "name": "",
                "phone": "",
                "relation": ""
            },
            first_name: "Thomas",
            gender: "male",
            identity_card_number: "591-8126496-32",
            language: "dutch",
            last_name: "Seberechts",
            nationality: "belgian",
            position: "Full Stack Developer",
            social_security_number: "92.02.18-383.53",
            teams: ["Employee"],
            work_contact: {
                email: "thomas@codious.io",
                mobile: "0032 479 92 23 85"
            }
        },
        {
            id: "593707516865cd044e87ef09",
            address: {
                "city": "Mechelen",
                "country": "België",
                "line1": "Brusselsesteenweg 387/01",
                "state": "Mechelen",
                "zip_code": "2800"
            },
            bank_account: {
                "bic": "BEBABEBB",
                "iban": "BE92 0013 7392 0023"
            },
            birth_date: "1989-10-21T00:00:00.000Z",
            birth_place: "Leuven",
            civil_status: "Unmarried",
            deleted: false,
            emergency_contact: {
                "name": "",
                "phone": "",
                "relation": ""
            },
            first_name: "Jens",
            gender: "male",
            identity_card_number: "592-1941265-85",
            language: "dutch",
            last_name: "Cappelle",
            nationality: "belgian",
            position: "Full Stack Developer",
            social_security_number: "89.10.21-093.52",
            teams: ["Employee"],
            work_contact: {
                email: "jens@codious.io",
                mobile: "0032 479 47 85 58"
            }
        },
        {
            id: "593707516865cd044e87ef0a",
            address: {
                "city": "Westerlo",
                "country": "België",
                "line1": "Geneinde 75",
                "state": "Antwerpen",
                "zip_code": "2260"
            },
            bank_account: {
                "bic": "KREDBEBB",
                "iban": "BE61 7310 3645 6817"
            },
            birth_date: "1990-05-07T00:00:00.000Z",
            birth_place: "Lier",
            civil_status: "legally cohabiting",
            deleted: false,
            emergency_contact: {
                "name": "",
                "phone": "",
                "relation": ""
            },
            first_name: "Mickey",
            gender: "male",
            identity_card_number: "592-2049521-89",
            language: "dutch",
            last_name: "Delen",
            nationality: "belgian",
            position: "Graphic Designer ",
            social_security_number: "90.05.07-159.04",
            teams: ["Employee"],
            work_contact: {
                email: "mickey@codious.io",
                mobile: "0032 479 57 32 97"
            }
        },
        {
            id: "593707516865cd044e87ef0b",
            address: {
                "city": "Genk",
                "country": "België",
                "line1": "Brentjestraat 11",
                "state": "Limburg",
                "zip_code": "3600"
            },
            bank_account: {
                "bic": "GEBABEBB",
                "iban": "BE18 1430 8314 4865"
            },
            birth_date: "1987-06-13T00:00:00.000Z",
            birth_place: "Vibo-Valentia (I)",
            civil_status: "married",
            deleted: false,
            emergency_contact: {
                "name": "Dario Giunta",
                "phone": '479772920',
                "relation": "Husband"
            },
            first_name: "Lucia",
            gender: "female",
            identity_card_number: "592-3543197-62",
            language: "dutch",
            last_name: "Zupo",
            nationality: "belgian",
            position: "HR/PR Manager",
            social_security_number: "87.06.13-362.50",
            teams: ["Management"],
            work_contact: {
                email: "lucia@codious.op",
                mobile: "0484 90 55 92"
            }
        },
        {
            id: "5cc5a0218e552b09f484d838",
            address: {
                "city": "Mol",
                "country": "België",
                "line1": "Ezaartveld",
                "state": "Antwerpen",
                "zip_code": "2400"
            },
            bank_account: {
                "bic": "AXABBE22",
                "iban": "BE387506 1412 7572"
            },
            birth_date: "1968-10-30T00:00:00.000Z",
            birth_place: "Mol",
            civil_status: "unmarried",
            deleted: false,
            emergency_contact: {
                "name": "",
                "phone": "",
                "relation": ""
            },
            first_name: "Marc",
            gender: "male",
            identity_card_number: "592-4788181-51",
            language: "dutch",
            last_name: "Smets",
            nationality: "belgian",
            position: "Full Stack Developer",
            social_security_number: "68.10.30-283.24",
            teams: ["Employee"],
            work_contact: {
                email: "marc@codious.io",
                mobile: "0472 43 62 31"
            }
        },
        {
            id: "593707516865cd044e87ef0c",
            address: {
                "city": "Pelt",
                "country": "België",
                "line1": "Masensstraat 61",
                "state": "Limburg",
                "zip_code": "3900"
            },
            bank_account: {
                "bic": "GEBABEBB",
                "iban": "BE88 0015 3752 2041"
            },
            birth_date: "1995-07-04T00:00:00.000Z",
            birth_place: "Pelt",
            civil_status: "Unmarried",
            deleted: false,
            emergency_contact: {
                "name": "",
                "phone": "",
                "relation": ""
            },
            first_name: "Dries",
            gender: "male",
            identity_card_number: "592-5483952-41",
            language: "dutch",
            last_name: "Stelten",
            nationality: "belgian",
            position: "Full Stack Developer",
            social_security_number: "95.07.04-281.91",
            teams: ["Employee"],
            work_contact: {
                email: "dries@codious.io",
                mobile: "0032 477 78 77 56"
            }
        },
        {
            id: "593707516865cd044e87ef0d",
            address: {
                "city": "Ravels",
                "country": "België",
                "line1": "Rietstraat 12",
                "state": "Antwerpen",
                "zip_code": "2380"
            },
            bank_account: {
                "bic": "GEBABEBB",
                "iban": "BE22 0016 79889547"
            },
            birth_date: "1997-03-20T00:00:00.000Z",
            birth_place: "Turnhout",
            civil_status: "unmarried",
            deleted: false,
            emergency_contact: {
                "name": "",
                "phone": "",
                "relation": ""
            },
            first_name: "Matthias",
            gender: "male",
            identity_card_number: "592-8883226-47",
            language: "dutch",
            last_name: "Greif",
            nationality: "belgian",
            position: "Full Stack Developer",
            social_security_number: "97.03.20-149.48",
            teams: ["Employee"],
            work_contact: {
                email: "matthias@codious.io",
                mobile: "0471 32 55 92"
            }
        }
    ];

    async list(): Promise<Array<Employee>> {

        return of(this._employees).toPromise();
    }

    async info(id: string): Promise<Employee | undefined> {

        if (id === '0') throw Error();

        return of(this._employees.find(x => x.id === id)).toPromise();
    }

    // private _backendUrl: string = 'http://localhost:4100/api/v1/employees';

    // constructor(private _httpClient: HttpClient) { }

    // getAll(): Observable<Array<Employee>> {

    //     return this._httpClient.get<Array<Employee>>(`${ this._backendUrl }.list`);
    // }

    // getDetail(id: string): Observable<Employee | undefined> {

    //     return this._httpClient.get<Employee>(`${ this._backendUrl }.info?id=${ id }`);
    // }
}