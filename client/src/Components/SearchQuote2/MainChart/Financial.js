import React from "react";

//Import scss
import "./MainChart.scss";

//Import clsx
import clsx from "clsx";

//Import Axios for API calling
import axios from "axios";

const data = {
    incomeStatementHistoryQuarterly: [
        {
            maxAge: 1,
            endDate: {
                raw: 1617148800,
                fmt: "2021-03-31",
            },
            totalRevenue: {
                raw: 10389000000,
                fmt: "10.39B",
                longFmt: "10,389,000,000",
            },
            costOfRevenue: {
                raw: 8174000000,
                fmt: "8.17B",
                longFmt: "8,174,000,000",
            },
            grossProfit: {
                raw: 2215000000,
                fmt: "2.21B",
                longFmt: "2,215,000,000",
            },
            researchDevelopment: {
                raw: 666000000,
                fmt: "666M",
                longFmt: "666,000,000",
            },
            sellingGeneralAdministrative: {
                raw: 1056000000,
                fmt: "1.06B",
                longFmt: "1,056,000,000",
            },
            nonRecurring: {},
            otherOperatingExpenses: {},
            totalOperatingExpenses: {
                raw: 9896000000,
                fmt: "9.9B",
                longFmt: "9,896,000,000",
            },
            operatingIncome: {
                raw: 493000000,
                fmt: "493M",
                longFmt: "493,000,000",
            },
            totalOtherIncomeExpenseNet: {
                raw: 40000000,
                fmt: "40M",
                longFmt: "40,000,000",
            },
            ebit: {
                raw: 493000000,
                fmt: "493M",
                longFmt: "493,000,000",
            },
            interestExpense: {
                raw: -79000000,
                fmt: "-79M",
                longFmt: "-79,000,000",
            },
            incomeBeforeTax: {
                raw: 533000000,
                fmt: "533M",
                longFmt: "533,000,000",
            },
            incomeTaxExpense: {
                raw: 69000000,
                fmt: "69M",
                longFmt: "69,000,000",
            },
            minorityInterest: {
                raw: 1448000000,
                fmt: "1.45B",
                longFmt: "1,448,000,000",
            },
            netIncomeFromContinuingOps: {
                raw: 464000000,
                fmt: "464M",
                longFmt: "464,000,000",
            },
            discontinuedOperations: {},
            extraordinaryItems: {},
            effectOfAccountingCharges: {},
            otherItems: {},
            netIncome: {
                raw: 438000000,
                fmt: "438M",
                longFmt: "438,000,000",
            },
            netIncomeApplicableToCommonShares: {
                raw: 438000000,
                fmt: "438M",
                longFmt: "438,000,000",
            },
        },
        {
            maxAge: 1,
            endDate: {
                raw: 1609372800,
                fmt: "2020-12-31",
            },
            totalRevenue: {
                raw: 10744000000,
                fmt: "10.74B",
                longFmt: "10,744,000,000",
            },
            costOfRevenue: {
                raw: 8678000000,
                fmt: "8.68B",
                longFmt: "8,678,000,000",
            },
            grossProfit: {
                raw: 2066000000,
                fmt: "2.07B",
                longFmt: "2,066,000,000",
            },
            researchDevelopment: {
                raw: 522000000,
                fmt: "522M",
                longFmt: "522,000,000",
            },
            sellingGeneralAdministrative: {
                raw: 969000000,
                fmt: "969M",
                longFmt: "969,000,000",
            },
            nonRecurring: {},
            otherOperatingExpenses: {},
            totalOperatingExpenses: {
                raw: 10169000000,
                fmt: "10.17B",
                longFmt: "10,169,000,000",
            },
            operatingIncome: {
                raw: 575000000,
                fmt: "575M",
                longFmt: "575,000,000",
            },
            totalOtherIncomeExpenseNet: {
                raw: -196000000,
                fmt: "-196M",
                longFmt: "-196,000,000",
            },
            ebit: {
                raw: 575000000,
                fmt: "575M",
                longFmt: "575,000,000",
            },
            interestExpense: {
                raw: -241000000,
                fmt: "-241M",
                longFmt: "-241,000,000",
            },
            incomeBeforeTax: {
                raw: 379000000,
                fmt: "379M",
                longFmt: "379,000,000",
            },
            incomeTaxExpense: {
                raw: 83000000,
                fmt: "83M",
                longFmt: "83,000,000",
            },
            minorityInterest: {
                raw: 1454000000,
                fmt: "1.45B",
                longFmt: "1,454,000,000",
            },
            netIncomeFromContinuingOps: {
                raw: 296000000,
                fmt: "296M",
                longFmt: "296,000,000",
            },
            discontinuedOperations: {},
            extraordinaryItems: {},
            effectOfAccountingCharges: {},
            otherItems: {},
            netIncome: {
                raw: 270000000,
                fmt: "270M",
                longFmt: "270,000,000",
            },
            netIncomeApplicableToCommonShares: {
                raw: 270000000,
                fmt: "270M",
                longFmt: "270,000,000",
            },
        },
        {
            maxAge: 1,
            endDate: {
                raw: 1601424000,
                fmt: "2020-09-30",
            },
            totalRevenue: {
                raw: 8771000000,
                fmt: "8.77B",
                longFmt: "8,771,000,000",
            },
            costOfRevenue: {
                raw: 6708000000,
                fmt: "6.71B",
                longFmt: "6,708,000,000",
            },
            grossProfit: {
                raw: 2063000000,
                fmt: "2.06B",
                longFmt: "2,063,000,000",
            },
            researchDevelopment: {
                raw: 366000000,
                fmt: "366M",
                longFmt: "366,000,000",
            },
            sellingGeneralAdministrative: {
                raw: 931000000,
                fmt: "931M",
                longFmt: "931,000,000",
            },
            nonRecurring: {},
            otherOperatingExpenses: {},
            totalOperatingExpenses: {
                raw: 8005000000,
                fmt: "8.01B",
                longFmt: "8,005,000,000",
            },
            operatingIncome: {
                raw: 766000000,
                fmt: "766M",
                longFmt: "766,000,000",
            },
            totalOtherIncomeExpenseNet: {
                raw: -211000000,
                fmt: "-211M",
                longFmt: "-211,000,000",
            },
            ebit: {
                raw: 766000000,
                fmt: "766M",
                longFmt: "766,000,000",
            },
            interestExpense: {
                raw: -162000000,
                fmt: "-162M",
                longFmt: "-162,000,000",
            },
            incomeBeforeTax: {
                raw: 555000000,
                fmt: "555M",
                longFmt: "555,000,000",
            },
            incomeTaxExpense: {
                raw: 186000000,
                fmt: "186M",
                longFmt: "186,000,000",
            },
            minorityInterest: {
                raw: 1469000000,
                fmt: "1.47B",
                longFmt: "1,469,000,000",
            },
            netIncomeFromContinuingOps: {
                raw: 369000000,
                fmt: "369M",
                longFmt: "369,000,000",
            },
            discontinuedOperations: {},
            extraordinaryItems: {},
            effectOfAccountingCharges: {},
            otherItems: {},
            netIncome: {
                raw: 331000000,
                fmt: "331M",
                longFmt: "331,000,000",
            },
            netIncomeApplicableToCommonShares: {
                raw: 300000000,
                fmt: "300M",
                longFmt: "300,000,000",
            },
        },
        {
            maxAge: 1,
            endDate: {
                raw: 1593475200,
                fmt: "2020-06-30",
            },
            totalRevenue: {
                raw: 6036000000,
                fmt: "6.04B",
                longFmt: "6,036,000,000",
            },
            costOfRevenue: {
                raw: 4769000000,
                fmt: "4.77B",
                longFmt: "4,769,000,000",
            },
            grossProfit: {
                raw: 1267000000,
                fmt: "1.27B",
                longFmt: "1,267,000,000",
            },
            researchDevelopment: {
                raw: 279000000,
                fmt: "279M",
                longFmt: "279,000,000",
            },
            sellingGeneralAdministrative: {
                raw: 661000000,
                fmt: "661M",
                longFmt: "661,000,000",
            },
            nonRecurring: {},
            otherOperatingExpenses: {},
            totalOperatingExpenses: {
                raw: 5709000000,
                fmt: "5.71B",
                longFmt: "5,709,000,000",
            },
            operatingIncome: {
                raw: 327000000,
                fmt: "327M",
                longFmt: "327,000,000",
            },
            totalOtherIncomeExpenseNet: {
                raw: -177000000,
                fmt: "-177M",
                longFmt: "-177,000,000",
            },
            ebit: {
                raw: 327000000,
                fmt: "327M",
                longFmt: "327,000,000",
            },
            interestExpense: {
                raw: -173000000,
                fmt: "-173M",
                longFmt: "-173,000,000",
            },
            incomeBeforeTax: {
                raw: 150000000,
                fmt: "150M",
                longFmt: "150,000,000",
            },
            incomeTaxExpense: {
                raw: 21000000,
                fmt: "21M",
                longFmt: "21,000,000",
            },
            minorityInterest: {
                raw: 1482000000,
                fmt: "1.48B",
                longFmt: "1,482,000,000",
            },
            netIncomeFromContinuingOps: {
                raw: 129000000,
                fmt: "129M",
                longFmt: "129,000,000",
            },
            discontinuedOperations: {},
            extraordinaryItems: {},
            effectOfAccountingCharges: {},
            otherItems: {},
            netIncome: {
                raw: 104000000,
                fmt: "104M",
                longFmt: "104,000,000",
            },
            netIncomeApplicableToCommonShares: {
                raw: 104000000,
                fmt: "104M",
                longFmt: "104,000,000",
            },
        },
    ],
    incomeStatementHistoryAnnual: [
        {
            maxAge: 1,
            endDate: {
                raw: 1609372800,
                fmt: "2020-12-31",
            },
            totalRevenue: {
                raw: 31536000000,
                fmt: "31.54B",
                longFmt: "31,536,000,000",
            },
            costOfRevenue: {
                raw: 24906000000,
                fmt: "24.91B",
                longFmt: "24,906,000,000",
            },
            grossProfit: {
                raw: 6630000000,
                fmt: "6.63B",
                longFmt: "6,630,000,000",
            },
            researchDevelopment: {
                raw: 1491000000,
                fmt: "1.49B",
                longFmt: "1,491,000,000",
            },
            sellingGeneralAdministrative: {
                raw: 3188000000,
                fmt: "3.19B",
                longFmt: "3,188,000,000",
            },
            nonRecurring: {},
            otherOperatingExpenses: {},
            totalOperatingExpenses: {
                raw: 29585000000,
                fmt: "29.59B",
                longFmt: "29,585,000,000",
            },
            operatingIncome: {
                raw: 1951000000,
                fmt: "1.95B",
                longFmt: "1,951,000,000",
            },
            totalOtherIncomeExpenseNet: {
                raw: -797000000,
                fmt: "-797M",
                longFmt: "-797,000,000",
            },
            ebit: {
                raw: 1951000000,
                fmt: "1.95B",
                longFmt: "1,951,000,000",
            },
            interestExpense: {
                raw: -784000000,
                fmt: "-784M",
                longFmt: "-784,000,000",
            },
            incomeBeforeTax: {
                raw: 1154000000,
                fmt: "1.15B",
                longFmt: "1,154,000,000",
            },
            incomeTaxExpense: {
                raw: 292000000,
                fmt: "292M",
                longFmt: "292,000,000",
            },
            minorityInterest: {
                raw: 1454000000,
                fmt: "1.45B",
                longFmt: "1,454,000,000",
            },
            netIncomeFromContinuingOps: {
                raw: 862000000,
                fmt: "862M",
                longFmt: "862,000,000",
            },
            discontinuedOperations: {},
            extraordinaryItems: {},
            effectOfAccountingCharges: {},
            otherItems: {},
            netIncome: {
                raw: 721000000,
                fmt: "721M",
                longFmt: "721,000,000",
            },
            netIncomeApplicableToCommonShares: {
                raw: 690000000,
                fmt: "690M",
                longFmt: "690,000,000",
            },
        },
        {
            maxAge: 1,
            endDate: {
                raw: 1577750400,
                fmt: "2019-12-31",
            },
            totalRevenue: {
                raw: 24578000000,
                fmt: "24.58B",
                longFmt: "24,578,000,000",
            },
            costOfRevenue: {
                raw: 20509000000,
                fmt: "20.51B",
                longFmt: "20,509,000,000",
            },
            grossProfit: {
                raw: 4069000000,
                fmt: "4.07B",
                longFmt: "4,069,000,000",
            },
            researchDevelopment: {
                raw: 1343000000,
                fmt: "1.34B",
                longFmt: "1,343,000,000",
            },
            sellingGeneralAdministrative: {
                raw: 2646000000,
                fmt: "2.65B",
                longFmt: "2,646,000,000",
            },
            nonRecurring: {},
            otherOperatingExpenses: {},
            totalOperatingExpenses: {
                raw: 24498000000,
                fmt: "24.5B",
                longFmt: "24,498,000,000",
            },
            operatingIncome: {
                raw: 80000000,
                fmt: "80M",
                longFmt: "80,000,000",
            },
            totalOtherIncomeExpenseNet: {
                raw: -745000000,
                fmt: "-745M",
                longFmt: "-745,000,000",
            },
            ebit: {
                raw: 80000000,
                fmt: "80M",
                longFmt: "80,000,000",
            },
            interestExpense: {
                raw: -725000000,
                fmt: "-725M",
                longFmt: "-725,000,000",
            },
            incomeBeforeTax: {
                raw: -665000000,
                fmt: "-665M",
                longFmt: "-665,000,000",
            },
            incomeTaxExpense: {
                raw: 110000000,
                fmt: "110M",
                longFmt: "110,000,000",
            },
            minorityInterest: {
                raw: 1492000000,
                fmt: "1.49B",
                longFmt: "1,492,000,000",
            },
            netIncomeFromContinuingOps: {
                raw: -775000000,
                fmt: "-775M",
                longFmt: "-775,000,000",
            },
            discontinuedOperations: {},
            extraordinaryItems: {},
            effectOfAccountingCharges: {},
            otherItems: {},
            netIncome: {
                raw: -862000000,
                fmt: "-862M",
                longFmt: "-862,000,000",
            },
            netIncomeApplicableToCommonShares: {
                raw: -870000000,
                fmt: "-870M",
                longFmt: "-870,000,000",
            },
        },
        {
            maxAge: 1,
            endDate: {
                raw: 1546214400,
                fmt: "2018-12-31",
            },
            totalRevenue: {
                raw: 21461000000,
                fmt: "21.46B",
                longFmt: "21,461,000,000",
            },
            costOfRevenue: {
                raw: 17419000000,
                fmt: "17.42B",
                longFmt: "17,419,000,000",
            },
            grossProfit: {
                raw: 4042000000,
                fmt: "4.04B",
                longFmt: "4,042,000,000",
            },
            researchDevelopment: {
                raw: 1460000000,
                fmt: "1.46B",
                longFmt: "1,460,000,000",
            },
            sellingGeneralAdministrative: {
                raw: 2835000000,
                fmt: "2.83B",
                longFmt: "2,835,000,000",
            },
            nonRecurring: {},
            otherOperatingExpenses: {},
            totalOperatingExpenses: {
                raw: 21714000000,
                fmt: "21.71B",
                longFmt: "21,714,000,000",
            },
            operatingIncome: {
                raw: -253000000,
                fmt: "-253M",
                longFmt: "-253,000,000",
            },
            totalOtherIncomeExpenseNet: {
                raw: -752000000,
                fmt: "-752M",
                longFmt: "-752,000,000",
            },
            ebit: {
                raw: -253000000,
                fmt: "-253M",
                longFmt: "-253,000,000",
            },
            interestExpense: {
                raw: -653000000,
                fmt: "-653M",
                longFmt: "-653,000,000",
            },
            incomeBeforeTax: {
                raw: -1005000000,
                fmt: "-1B",
                longFmt: "-1,005,000,000",
            },
            incomeTaxExpense: {
                raw: 58000000,
                fmt: "58M",
                longFmt: "58,000,000",
            },
            minorityInterest: {
                raw: 1390000000,
                fmt: "1.39B",
                longFmt: "1,390,000,000",
            },
            netIncomeFromContinuingOps: {
                raw: -1063000000,
                fmt: "-1.06B",
                longFmt: "-1,063,000,000",
            },
            discontinuedOperations: {},
            extraordinaryItems: {},
            effectOfAccountingCharges: {},
            otherItems: {},
            netIncome: {
                raw: -976000000,
                fmt: "-976M",
                longFmt: "-976,000,000",
            },
            netIncomeApplicableToCommonShares: {
                raw: -976000000,
                fmt: "-976M",
                longFmt: "-976,000,000",
            },
        },
        {
            maxAge: 1,
            endDate: {
                raw: 1514678400,
                fmt: "2017-12-31",
            },
            totalRevenue: {
                raw: 11759000000,
                fmt: "11.76B",
                longFmt: "11,759,000,000",
            },
            costOfRevenue: {
                raw: 9536000000,
                fmt: "9.54B",
                longFmt: "9,536,000,000",
            },
            grossProfit: {
                raw: 2223000000,
                fmt: "2.22B",
                longFmt: "2,223,000,000",
            },
            researchDevelopment: {
                raw: 1378000000,
                fmt: "1.38B",
                longFmt: "1,378,000,000",
            },
            sellingGeneralAdministrative: {
                raw: 2477000000,
                fmt: "2.48B",
                longFmt: "2,477,000,000",
            },
            nonRecurring: {},
            otherOperatingExpenses: {},
            totalOperatingExpenses: {
                raw: 13391000000,
                fmt: "13.39B",
                longFmt: "13,391,000,000",
            },
            operatingIncome: {
                raw: -1632000000,
                fmt: "-1.63B",
                longFmt: "-1,632,000,000",
            },
            totalOtherIncomeExpenseNet: {
                raw: -577000000,
                fmt: "-577M",
                longFmt: "-577,000,000",
            },
            ebit: {
                raw: -1632000000,
                fmt: "-1.63B",
                longFmt: "-1,632,000,000",
            },
            interestExpense: {
                raw: -477000000,
                fmt: "-477M",
                longFmt: "-477,000,000",
            },
            incomeBeforeTax: {
                raw: -2209000000,
                fmt: "-2.21B",
                longFmt: "-2,209,000,000",
            },
            incomeTaxExpense: {
                raw: 32000000,
                fmt: "32M",
                longFmt: "32,000,000",
            },
            minorityInterest: {
                raw: 1395080000,
                fmt: "1.4B",
                longFmt: "1,395,080,000",
            },
            netIncomeFromContinuingOps: {
                raw: -2241000000,
                fmt: "-2.24B",
                longFmt: "-2,241,000,000",
            },
            discontinuedOperations: {},
            extraordinaryItems: {},
            effectOfAccountingCharges: {},
            otherItems: {},
            netIncome: {
                raw: -1962000000,
                fmt: "-1.96B",
                longFmt: "-1,962,000,000",
            },
            netIncomeApplicableToCommonShares: {
                raw: -1962000000,
                fmt: "-1.96B",
                longFmt: "-1,962,000,000",
            },
        },
    ],
    balanceSheetHistoryQuarterly: [
        {
            maxAge: 1,
            endDate: {
                raw: 1617148800,
                fmt: "2021-03-31",
            },
            cash: {
                raw: 17141000000,
                fmt: "17.14B",
                longFmt: "17,141,000,000",
            },
            netReceivables: {
                raw: 1913000000,
                fmt: "1.91B",
                longFmt: "1,913,000,000",
            },
            inventory: {
                raw: 4132000000,
                fmt: "4.13B",
                longFmt: "4,132,000,000",
            },
            otherCurrentAssets: {
                raw: 305000000,
                fmt: "305M",
                longFmt: "305,000,000",
            },
            totalCurrentAssets: {
                raw: 24705000000,
                fmt: "24.7B",
                longFmt: "24,705,000,000",
            },
            propertyPlantEquipment: {
                raw: 24844000000,
                fmt: "24.84B",
                longFmt: "24,844,000,000",
            },
            goodWill: {
                raw: 206000000,
                fmt: "206M",
                longFmt: "206,000,000",
            },
            intangibleAssets: {
                raw: 299000000,
                fmt: "299M",
                longFmt: "299,000,000",
            },
            otherAssets: {
                raw: 2918000000,
                fmt: "2.92B",
                longFmt: "2,918,000,000",
            },
            totalAssets: {
                raw: 52972000000,
                fmt: "52.97B",
                longFmt: "52,972,000,000",
            },
            accountsPayable: {
                raw: 6648000000,
                fmt: "6.65B",
                longFmt: "6,648,000,000",
            },
            shortLongTermDebt: {
                raw: 1415000000,
                fmt: "1.42B",
                longFmt: "1,415,000,000",
            },
            otherCurrentLiab: {
                raw: 4412000000,
                fmt: "4.41B",
                longFmt: "4,412,000,000",
            },
            longTermDebt: {
                raw: 8019000000,
                fmt: "8.02B",
                longFmt: "8,019,000,000",
            },
            otherLiab: {
                raw: 3247000000,
                fmt: "3.25B",
                longFmt: "3,247,000,000",
            },
            minorityInterest: {
                raw: 1448000000,
                fmt: "1.45B",
                longFmt: "1,448,000,000",
            },
            totalCurrentLiabilities: {
                raw: 14877000000,
                fmt: "14.88B",
                longFmt: "14,877,000,000",
            },
            totalLiab: {
                raw: 28507000000,
                fmt: "28.51B",
                longFmt: "28,507,000,000",
            },
            commonStock: {
                raw: 1000000,
                fmt: "1M",
                longFmt: "1,000,000",
            },
            retainedEarnings: {
                raw: -4750000000,
                fmt: "-4.75B",
                longFmt: "-4,750,000,000",
            },
            treasuryStock: {
                raw: 143000000,
                fmt: "143M",
                longFmt: "143,000,000",
            },
            capitalSurplus: {
                raw: 27623000000,
                fmt: "27.62B",
                longFmt: "27,623,000,000",
            },
            otherStockholderEquity: {
                raw: 143000000,
                fmt: "143M",
                longFmt: "143,000,000",
            },
            totalStockholderEquity: {
                raw: 23017000000,
                fmt: "23.02B",
                longFmt: "23,017,000,000",
            },
            netTangibleAssets: {
                raw: 22512000000,
                fmt: "22.51B",
                longFmt: "22,512,000,000",
            },
        },
        {
            maxAge: 1,
            endDate: {
                raw: 1609372800,
                fmt: "2020-12-31",
            },
            cash: {
                raw: 19384000000,
                fmt: "19.38B",
                longFmt: "19,384,000,000",
            },
            netReceivables: {
                raw: 1903000000,
                fmt: "1.9B",
                longFmt: "1,903,000,000",
            },
            inventory: {
                raw: 4101000000,
                fmt: "4.1B",
                longFmt: "4,101,000,000",
            },
            otherCurrentAssets: {
                raw: 238000000,
                fmt: "238M",
                longFmt: "238,000,000",
            },
            totalCurrentAssets: {
                raw: 26717000000,
                fmt: "26.72B",
                longFmt: "26,717,000,000",
            },
            propertyPlantEquipment: {
                raw: 23375000000,
                fmt: "23.38B",
                longFmt: "23,375,000,000",
            },
            goodWill: {
                raw: 207000000,
                fmt: "207M",
                longFmt: "207,000,000",
            },
            intangibleAssets: {
                raw: 313000000,
                fmt: "313M",
                longFmt: "313,000,000",
            },
            otherAssets: {
                raw: 1536000000,
                fmt: "1.54B",
                longFmt: "1,536,000,000",
            },
            totalAssets: {
                raw: 52148000000,
                fmt: "52.15B",
                longFmt: "52,148,000,000",
            },
            accountsPayable: {
                raw: 6051000000,
                fmt: "6.05B",
                longFmt: "6,051,000,000",
            },
            shortLongTermDebt: {
                raw: 1758000000,
                fmt: "1.76B",
                longFmt: "1,758,000,000",
            },
            otherCurrentLiab: {
                raw: 4147000000,
                fmt: "4.15B",
                longFmt: "4,147,000,000",
            },
            longTermDebt: {
                raw: 8571000000,
                fmt: "8.57B",
                longFmt: "8,571,000,000",
            },
            otherLiab: {
                raw: 3302000000,
                fmt: "3.3B",
                longFmt: "3,302,000,000",
            },
            minorityInterest: {
                raw: 1454000000,
                fmt: "1.45B",
                longFmt: "1,454,000,000",
            },
            totalCurrentLiabilities: {
                raw: 14248000000,
                fmt: "14.25B",
                longFmt: "14,248,000,000",
            },
            totalLiab: {
                raw: 28469000000,
                fmt: "28.47B",
                longFmt: "28,469,000,000",
            },
            commonStock: {
                raw: 1000000,
                fmt: "1M",
                longFmt: "1,000,000",
            },
            retainedEarnings: {
                raw: -5399000000,
                fmt: "-5.4B",
                longFmt: "-5,399,000,000",
            },
            treasuryStock: {
                raw: 363000000,
                fmt: "363M",
                longFmt: "363,000,000",
            },
            capitalSurplus: {
                raw: 27260000000,
                fmt: "27.26B",
                longFmt: "27,260,000,000",
            },
            otherStockholderEquity: {
                raw: 363000000,
                fmt: "363M",
                longFmt: "363,000,000",
            },
            totalStockholderEquity: {
                raw: 22225000000,
                fmt: "22.23B",
                longFmt: "22,225,000,000",
            },
            netTangibleAssets: {
                raw: 21705000000,
                fmt: "21.7B",
                longFmt: "21,705,000,000",
            },
        },
        {
            maxAge: 1,
            endDate: {
                raw: 1601424000,
                fmt: "2020-09-30",
            },
            cash: {
                raw: 14531000000,
                fmt: "14.53B",
                longFmt: "14,531,000,000",
            },
            netReceivables: {
                raw: 1766000000,
                fmt: "1.77B",
                longFmt: "1,766,000,000",
            },
            inventory: {
                raw: 4218000000,
                fmt: "4.22B",
                longFmt: "4,218,000,000",
            },
            otherCurrentAssets: {
                raw: 174000000,
                fmt: "174M",
                longFmt: "174,000,000",
            },
            totalCurrentAssets: {
                raw: 21744000000,
                fmt: "21.74B",
                longFmt: "21,744,000,000",
            },
            propertyPlantEquipment: {
                raw: 21990000000,
                fmt: "21.99B",
                longFmt: "21,990,000,000",
            },
            goodWill: {
                raw: 203000000,
                fmt: "203M",
                longFmt: "203,000,000",
            },
            intangibleAssets: {
                raw: 318000000,
                fmt: "318M",
                longFmt: "318,000,000",
            },
            otherAssets: {
                raw: 1436000000,
                fmt: "1.44B",
                longFmt: "1,436,000,000",
            },
            totalAssets: {
                raw: 45691000000,
                fmt: "45.69B",
                longFmt: "45,691,000,000",
            },
            accountsPayable: {
                raw: 4958000000,
                fmt: "4.96B",
                longFmt: "4,958,000,000",
            },
            shortLongTermDebt: {
                raw: 2814000000,
                fmt: "2.81B",
                longFmt: "2,814,000,000",
            },
            otherCurrentLiab: {
                raw: 3655000000,
                fmt: "3.65B",
                longFmt: "3,655,000,000",
            },
            longTermDebt: {
                raw: 9506000000,
                fmt: "9.51B",
                longFmt: "9,506,000,000",
            },
            otherLiab: {
                raw: 3151000000,
                fmt: "3.15B",
                longFmt: "3,151,000,000",
            },
            minorityInterest: {
                raw: 1469000000,
                fmt: "1.47B",
                longFmt: "1,469,000,000",
            },
            totalCurrentLiabilities: {
                raw: 13302000000,
                fmt: "13.3B",
                longFmt: "13,302,000,000",
            },
            totalLiab: {
                raw: 28191000000,
                fmt: "28.19B",
                longFmt: "28,191,000,000",
            },
            commonStock: {
                raw: 1000000,
                fmt: "1M",
                longFmt: "1,000,000",
            },
            retainedEarnings: {
                raw: -5669000000,
                fmt: "-5.67B",
                longFmt: "-5,669,000,000",
            },
            treasuryStock: {
                raw: 125000000,
                fmt: "125M",
                longFmt: "125,000,000",
            },
            capitalSurplus: {
                raw: 21574000000,
                fmt: "21.57B",
                longFmt: "21,574,000,000",
            },
            otherStockholderEquity: {
                raw: 125000000,
                fmt: "125M",
                longFmt: "125,000,000",
            },
            totalStockholderEquity: {
                raw: 16031000000,
                fmt: "16.03B",
                longFmt: "16,031,000,000",
            },
            netTangibleAssets: {
                raw: 15510000000,
                fmt: "15.51B",
                longFmt: "15,510,000,000",
            },
        },
        {
            maxAge: 1,
            endDate: {
                raw: 1593475200,
                fmt: "2020-06-30",
            },
            cash: {
                raw: 8615000000,
                fmt: "8.62B",
                longFmt: "8,615,000,000",
            },
            netReceivables: {
                raw: 1495000000,
                fmt: "1.5B",
                longFmt: "1,495,000,000",
            },
            inventory: {
                raw: 4018000000,
                fmt: "4.02B",
                longFmt: "4,018,000,000",
            },
            otherCurrentAssets: {
                raw: 203000000,
                fmt: "203M",
                longFmt: "203,000,000",
            },
            totalCurrentAssets: {
                raw: 15336000000,
                fmt: "15.34B",
                longFmt: "15,336,000,000",
            },
            propertyPlantEquipment: {
                raw: 20876000000,
                fmt: "20.88B",
                longFmt: "20,876,000,000",
            },
            goodWill: {
                raw: 196000000,
                fmt: "196M",
                longFmt: "196,000,000",
            },
            intangibleAssets: {
                raw: 312000000,
                fmt: "312M",
                longFmt: "312,000,000",
            },
            otherAssets: {
                raw: 1415000000,
                fmt: "1.42B",
                longFmt: "1,415,000,000",
            },
            totalAssets: {
                raw: 38135000000,
                fmt: "38.13B",
                longFmt: "38,135,000,000",
            },
            accountsPayable: {
                raw: 3638000000,
                fmt: "3.64B",
                longFmt: "3,638,000,000",
            },
            shortLongTermDebt: {
                raw: 3364000000,
                fmt: "3.36B",
                longFmt: "3,364,000,000",
            },
            otherCurrentLiab: {
                raw: 3305000000,
                fmt: "3.31B",
                longFmt: "3,305,000,000",
            },
            longTermDebt: {
                raw: 9333000000,
                fmt: "9.33B",
                longFmt: "9,333,000,000",
            },
            otherLiab: {
                raw: 3010000000,
                fmt: "3.01B",
                longFmt: "3,010,000,000",
            },
            minorityInterest: {
                raw: 1482000000,
                fmt: "1.48B",
                longFmt: "1,482,000,000",
            },
            totalCurrentLiabilities: {
                raw: 12270000000,
                fmt: "12.27B",
                longFmt: "12,270,000,000",
            },
            totalLiab: {
                raw: 26798000000,
                fmt: "26.8B",
                longFmt: "26,798,000,000",
            },
            retainedEarnings: {
                raw: -6000000000,
                fmt: "-6B",
                longFmt: "-6,000,000,000",
            },
            treasuryStock: {
                raw: -40000000,
                fmt: "-40M",
                longFmt: "-40,000,000",
            },
            capitalSurplus: {
                raw: 15895000000,
                fmt: "15.89B",
                longFmt: "15,895,000,000",
            },
            otherStockholderEquity: {
                raw: -40000000,
                fmt: "-40M",
                longFmt: "-40,000,000",
            },
            totalStockholderEquity: {
                raw: 9855000000,
                fmt: "9.86B",
                longFmt: "9,855,000,000",
            },
            netTangibleAssets: {
                raw: 9347000000,
                fmt: "9.35B",
                longFmt: "9,347,000,000",
            },
        },
    ],
    balanceSheetHistoryAnnual: [
        {
            maxAge: 1,
            endDate: {
                raw: 1609372800,
                fmt: "2020-12-31",
            },
            cash: {
                raw: 19384000000,
                fmt: "19.38B",
                longFmt: "19,384,000,000",
            },
            netReceivables: {
                raw: 1903000000,
                fmt: "1.9B",
                longFmt: "1,903,000,000",
            },
            inventory: {
                raw: 4101000000,
                fmt: "4.1B",
                longFmt: "4,101,000,000",
            },
            otherCurrentAssets: {
                raw: 238000000,
                fmt: "238M",
                longFmt: "238,000,000",
            },
            totalCurrentAssets: {
                raw: 26717000000,
                fmt: "26.72B",
                longFmt: "26,717,000,000",
            },
            propertyPlantEquipment: {
                raw: 23375000000,
                fmt: "23.38B",
                longFmt: "23,375,000,000",
            },
            goodWill: {
                raw: 207000000,
                fmt: "207M",
                longFmt: "207,000,000",
            },
            intangibleAssets: {
                raw: 313000000,
                fmt: "313M",
                longFmt: "313,000,000",
            },
            otherAssets: {
                raw: 1536000000,
                fmt: "1.54B",
                longFmt: "1,536,000,000",
            },
            totalAssets: {
                raw: 52148000000,
                fmt: "52.15B",
                longFmt: "52,148,000,000",
            },
            accountsPayable: {
                raw: 6051000000,
                fmt: "6.05B",
                longFmt: "6,051,000,000",
            },
            shortLongTermDebt: {
                raw: 1758000000,
                fmt: "1.76B",
                longFmt: "1,758,000,000",
            },
            otherCurrentLiab: {
                raw: 4147000000,
                fmt: "4.15B",
                longFmt: "4,147,000,000",
            },
            longTermDebt: {
                raw: 8571000000,
                fmt: "8.57B",
                longFmt: "8,571,000,000",
            },
            otherLiab: {
                raw: 3302000000,
                fmt: "3.3B",
                longFmt: "3,302,000,000",
            },
            minorityInterest: {
                raw: 1454000000,
                fmt: "1.45B",
                longFmt: "1,454,000,000",
            },
            totalCurrentLiabilities: {
                raw: 14248000000,
                fmt: "14.25B",
                longFmt: "14,248,000,000",
            },
            totalLiab: {
                raw: 28469000000,
                fmt: "28.47B",
                longFmt: "28,469,000,000",
            },
            commonStock: {
                raw: 1000000,
                fmt: "1M",
                longFmt: "1,000,000",
            },
            retainedEarnings: {
                raw: -5399000000,
                fmt: "-5.4B",
                longFmt: "-5,399,000,000",
            },
            treasuryStock: {
                raw: 363000000,
                fmt: "363M",
                longFmt: "363,000,000",
            },
            capitalSurplus: {
                raw: 27260000000,
                fmt: "27.26B",
                longFmt: "27,260,000,000",
            },
            otherStockholderEquity: {
                raw: 363000000,
                fmt: "363M",
                longFmt: "363,000,000",
            },
            totalStockholderEquity: {
                raw: 22225000000,
                fmt: "22.23B",
                longFmt: "22,225,000,000",
            },
            netTangibleAssets: {
                raw: 21705000000,
                fmt: "21.7B",
                longFmt: "21,705,000,000",
            },
        },
        {
            maxAge: 1,
            endDate: {
                raw: 1577750400,
                fmt: "2019-12-31",
            },
            cash: {
                raw: 6268000000,
                fmt: "6.27B",
                longFmt: "6,268,000,000",
            },
            netReceivables: {
                raw: 1324000000,
                fmt: "1.32B",
                longFmt: "1,324,000,000",
            },
            inventory: {
                raw: 3552000000,
                fmt: "3.55B",
                longFmt: "3,552,000,000",
            },
            otherCurrentAssets: {
                raw: 246000000,
                fmt: "246M",
                longFmt: "246,000,000",
            },
            totalCurrentAssets: {
                raw: 12103000000,
                fmt: "12.1B",
                longFmt: "12,103,000,000",
            },
            longTermInvestments: {
                raw: 1000000,
                fmt: "1M",
                longFmt: "1,000,000",
            },
            propertyPlantEquipment: {
                raw: 20199000000,
                fmt: "20.2B",
                longFmt: "20,199,000,000",
            },
            goodWill: {
                raw: 198000000,
                fmt: "198M",
                longFmt: "198,000,000",
            },
            intangibleAssets: {
                raw: 339000000,
                fmt: "339M",
                longFmt: "339,000,000",
            },
            otherAssets: {
                raw: 1469000000,
                fmt: "1.47B",
                longFmt: "1,469,000,000",
            },
            totalAssets: {
                raw: 34309000000,
                fmt: "34.31B",
                longFmt: "34,309,000,000",
            },
            accountsPayable: {
                raw: 3771000000,
                fmt: "3.77B",
                longFmt: "3,771,000,000",
            },
            shortLongTermDebt: {
                raw: 1399000000,
                fmt: "1.4B",
                longFmt: "1,399,000,000",
            },
            otherCurrentLiab: {
                raw: 3693000000,
                fmt: "3.69B",
                longFmt: "3,693,000,000",
            },
            longTermDebt: {
                raw: 10375000000,
                fmt: "10.38B",
                longFmt: "10,375,000,000",
            },
            otherLiab: {
                raw: 2969000000,
                fmt: "2.97B",
                longFmt: "2,969,000,000",
            },
            minorityInterest: {
                raw: 1492000000,
                fmt: "1.49B",
                longFmt: "1,492,000,000",
            },
            totalCurrentLiabilities: {
                raw: 10667000000,
                fmt: "10.67B",
                longFmt: "10,667,000,000",
            },
            totalLiab: {
                raw: 26199000000,
                fmt: "26.2B",
                longFmt: "26,199,000,000",
            },
            commonStock: {
                raw: 1000000,
                fmt: "1M",
                longFmt: "1,000,000",
            },
            retainedEarnings: {
                raw: -6083000000,
                fmt: "-6.08B",
                longFmt: "-6,083,000,000",
            },
            treasuryStock: {
                raw: -36000000,
                fmt: "-36M",
                longFmt: "-36,000,000",
            },
            capitalSurplus: {
                raw: 12736000000,
                fmt: "12.74B",
                longFmt: "12,736,000,000",
            },
            otherStockholderEquity: {
                raw: -36000000,
                fmt: "-36M",
                longFmt: "-36,000,000",
            },
            totalStockholderEquity: {
                raw: 6618000000,
                fmt: "6.62B",
                longFmt: "6,618,000,000",
            },
            netTangibleAssets: {
                raw: 6081000000,
                fmt: "6.08B",
                longFmt: "6,081,000,000",
            },
        },
        {
            maxAge: 1,
            endDate: {
                raw: 1546214400,
                fmt: "2018-12-31",
            },
            cash: {
                raw: 3686000000,
                fmt: "3.69B",
                longFmt: "3,686,000,000",
            },
            netReceivables: {
                raw: 949000000,
                fmt: "949M",
                longFmt: "949,000,000",
            },
            inventory: {
                raw: 3113000000,
                fmt: "3.11B",
                longFmt: "3,113,000,000",
            },
            otherCurrentAssets: {
                raw: 193000000,
                fmt: "193M",
                longFmt: "193,000,000",
            },
            totalCurrentAssets: {
                raw: 8307000000,
                fmt: "8.31B",
                longFmt: "8,307,000,000",
            },
            longTermInvestments: {
                raw: 12000000,
                fmt: "12M",
                longFmt: "12,000,000",
            },
            propertyPlantEquipment: {
                raw: 19691000000,
                fmt: "19.69B",
                longFmt: "19,691,000,000",
            },
            goodWill: {
                raw: 68000000,
                fmt: "68M",
                longFmt: "68,000,000",
            },
            intangibleAssets: {
                raw: 282000000,
                fmt: "282M",
                longFmt: "282,000,000",
            },
            otherAssets: {
                raw: 1380000000,
                fmt: "1.38B",
                longFmt: "1,380,000,000",
            },
            totalAssets: {
                raw: 29740000000,
                fmt: "29.74B",
                longFmt: "29,740,000,000",
            },
            accountsPayable: {
                raw: 3405000000,
                fmt: "3.4B",
                longFmt: "3,405,000,000",
            },
            shortLongTermDebt: {
                raw: 2284000000,
                fmt: "2.28B",
                longFmt: "2,284,000,000",
            },
            otherCurrentLiab: {
                raw: 2955000000,
                fmt: "2.96B",
                longFmt: "2,955,000,000",
            },
            longTermDebt: {
                raw: 8461000000,
                fmt: "8.46B",
                longFmt: "8,461,000,000",
            },
            otherLiab: {
                raw: 2318000000,
                fmt: "2.32B",
                longFmt: "2,318,000,000",
            },
            minorityInterest: {
                raw: 1390000000,
                fmt: "1.39B",
                longFmt: "1,390,000,000",
            },
            totalCurrentLiabilities: {
                raw: 9993000000,
                fmt: "9.99B",
                longFmt: "9,993,000,000",
            },
            totalLiab: {
                raw: 23427000000,
                fmt: "23.43B",
                longFmt: "23,427,000,000",
            },
            retainedEarnings: {
                raw: -5318000000,
                fmt: "-5.32B",
                longFmt: "-5,318,000,000",
            },
            treasuryStock: {
                raw: -8000000,
                fmt: "-8M",
                longFmt: "-8,000,000",
            },
            capitalSurplus: {
                raw: 10249000000,
                fmt: "10.25B",
                longFmt: "10,249,000,000",
            },
            otherStockholderEquity: {
                raw: -8000000,
                fmt: "-8M",
                longFmt: "-8,000,000",
            },
            totalStockholderEquity: {
                raw: 4923000000,
                fmt: "4.92B",
                longFmt: "4,923,000,000",
            },
            netTangibleAssets: {
                raw: 4573000000,
                fmt: "4.57B",
                longFmt: "4,573,000,000",
            },
        },
        {
            maxAge: 1,
            endDate: {
                raw: 1514678400,
                fmt: "2017-12-31",
            },
            cash: {
                raw: 3367914000,
                fmt: "3.37B",
                longFmt: "3,367,914,000",
            },
            netReceivables: {
                raw: 515381000,
                fmt: "515.38M",
                longFmt: "515,381,000",
            },
            inventory: {
                raw: 2263537000,
                fmt: "2.26B",
                longFmt: "2,263,537,000",
            },
            otherCurrentAssets: {
                raw: 155323000,
                fmt: "155.32M",
                longFmt: "155,323,000",
            },
            totalCurrentAssets: {
                raw: 6570520000,
                fmt: "6.57B",
                longFmt: "6,570,520,000",
            },
            longTermInvestments: {
                raw: 5304000,
                fmt: "5.3M",
                longFmt: "5,304,000",
            },
            propertyPlantEquipment: {
                raw: 20491616000,
                fmt: "20.49B",
                longFmt: "20,491,616,000",
            },
            goodWill: {
                raw: 60237000,
                fmt: "60.24M",
                longFmt: "60,237,000",
            },
            intangibleAssets: {
                raw: 361502000,
                fmt: "361.5M",
                longFmt: "361,502,000",
            },
            otherAssets: {
                raw: 1166193000,
                fmt: "1.17B",
                longFmt: "1,166,193,000",
            },
            totalAssets: {
                raw: 28655372000,
                fmt: "28.66B",
                longFmt: "28,655,372,000",
            },
            accountsPayable: {
                raw: 2390250000,
                fmt: "2.39B",
                longFmt: "2,390,250,000",
            },
            shortLongTermDebt: {
                raw: 963932000,
                fmt: "963.93M",
                longFmt: "963,932,000",
            },
            otherCurrentLiab: {
                raw: 3098379000,
                fmt: "3.1B",
                longFmt: "3,098,379,000",
            },
            longTermDebt: {
                raw: 9486248000,
                fmt: "9.49B",
                longFmt: "9,486,248,000",
            },
            otherLiab: {
                raw: 4196294000,
                fmt: "4.2B",
                longFmt: "4,196,294,000",
            },
            minorityInterest: {
                raw: 1395080000,
                fmt: "1.4B",
                longFmt: "1,395,080,000",
            },
            totalCurrentLiabilities: {
                raw: 7674740000,
                fmt: "7.67B",
                longFmt: "7,674,740,000",
            },
            totalLiab: {
                raw: 23023050000,
                fmt: "23.02B",
                longFmt: "23,023,050,000",
            },
            commonStock: {
                raw: 169000,
                fmt: "169k",
                longFmt: "169,000",
            },
            retainedEarnings: {
                raw: -4974299000,
                fmt: "-4.97B",
                longFmt: "-4,974,299,000",
            },
            treasuryStock: {
                raw: 33348000,
                fmt: "33.35M",
                longFmt: "33,348,000",
            },
            capitalSurplus: {
                raw: 9178024000,
                fmt: "9.18B",
                longFmt: "9,178,024,000",
            },
            otherStockholderEquity: {
                raw: 33348000,
                fmt: "33.35M",
                longFmt: "33,348,000",
            },
            totalStockholderEquity: {
                raw: 4237242000,
                fmt: "4.24B",
                longFmt: "4,237,242,000",
            },
            netTangibleAssets: {
                raw: 3815503000,
                fmt: "3.82B",
                longFmt: "3,815,503,000",
            },
        },
    ],
    cashflowStatementHistoryQuarterly: [
        {
            maxAge: 1,
            endDate: {
                raw: 1617148800,
                fmt: "2021-03-31",
            },
            netIncome: {
                raw: 438000000,
                fmt: "438M",
                longFmt: "438,000,000",
            },
            depreciation: {
                raw: 621000000,
                fmt: "621M",
                longFmt: "621,000,000",
            },
            changeToNetincome: {
                raw: 594000000,
                fmt: "594M",
                longFmt: "594,000,000",
            },
            changeToAccountReceivables: {
                raw: -24000000,
                fmt: "-24M",
                longFmt: "-24,000,000",
            },
            changeToLiabilities: {
                raw: 834000000,
                fmt: "834M",
                longFmt: "834,000,000",
            },
            changeToInventory: {
                raw: -106000000,
                fmt: "-106M",
                longFmt: "-106,000,000",
            },
            changeToOperatingActivities: {
                raw: -716000000,
                fmt: "-716M",
                longFmt: "-716,000,000",
            },
            totalCashFromOperatingActivities: {
                raw: 1641000000,
                fmt: "1.64B",
                longFmt: "1,641,000,000",
            },
            capitalExpenditures: {
                raw: -2860000000,
                fmt: "-2.86B",
                longFmt: "-2,860,000,000",
            },
            otherCashflowsFromInvestingActivities: {
                raw: 6000000,
                fmt: "6M",
                longFmt: "6,000,000",
            },
            totalCashflowsFromInvestingActivities: {
                raw: -2582000000,
                fmt: "-2.58B",
                longFmt: "-2,582,000,000",
            },
            netBorrowings: {
                raw: -1162000000,
                fmt: "-1.16B",
                longFmt: "-1,162,000,000",
            },
            otherCashflowsFromFinancingActivities: {
                raw: -37000000,
                fmt: "-37M",
                longFmt: "-37,000,000",
            },
            totalCashFromFinancingActivities: {
                raw: -1016000000,
                fmt: "-1.02B",
                longFmt: "-1,016,000,000",
            },
            effectOfExchangeRate: {
                raw: -221000000,
                fmt: "-221M",
                longFmt: "-221,000,000",
            },
            changeInCash: {
                raw: -2178000000,
                fmt: "-2.18B",
                longFmt: "-2,178,000,000",
            },
            issuanceOfStock: {
                raw: 183000000,
                fmt: "183M",
                longFmt: "183,000,000",
            },
        },
        {
            maxAge: 1,
            endDate: {
                raw: 1609372800,
                fmt: "2020-12-31",
            },
            netIncome: {
                raw: 270000000,
                fmt: "270M",
                longFmt: "270,000,000",
            },
            depreciation: {
                raw: 618000000,
                fmt: "618M",
                longFmt: "618,000,000",
            },
            changeToNetincome: {
                raw: 853000000,
                fmt: "853M",
                longFmt: "853,000,000",
            },
            changeToAccountReceivables: {
                raw: -102000000,
                fmt: "-102M",
                longFmt: "-102,000,000",
            },
            changeToLiabilities: {
                raw: 1540000000,
                fmt: "1.54B",
                longFmt: "1,540,000,000",
            },
            changeToInventory: {
                raw: 180000000,
                fmt: "180M",
                longFmt: "180,000,000",
            },
            changeToOperatingActivities: {
                raw: -376000000,
                fmt: "-376M",
                longFmt: "-376,000,000",
            },
            totalCashFromOperatingActivities: {
                raw: 3019000000,
                fmt: "3.02B",
                longFmt: "3,019,000,000",
            },
            capitalExpenditures: {
                raw: -1164000000,
                fmt: "-1.16B",
                longFmt: "-1,164,000,000",
            },
            otherCashflowsFromInvestingActivities: {
                raw: 122000000,
                fmt: "122M",
                longFmt: "122,000,000",
            },
            totalCashflowsFromInvestingActivities: {
                raw: -1047000000,
                fmt: "-1.05B",
                longFmt: "-1,047,000,000",
            },
            netBorrowings: {
                raw: -2305000000,
                fmt: "-2.31B",
                longFmt: "-2,305,000,000",
            },
            otherCashflowsFromFinancingActivities: {
                raw: -46000000,
                fmt: "-46M",
                longFmt: "-46,000,000",
            },
            totalCashFromFinancingActivities: {
                raw: 2692000000,
                fmt: "2.69B",
                longFmt: "2,692,000,000",
            },
            effectOfExchangeRate: {
                raw: 234000000,
                fmt: "234M",
                longFmt: "234,000,000",
            },
            changeInCash: {
                raw: 4898000000,
                fmt: "4.9B",
                longFmt: "4,898,000,000",
            },
            issuanceOfStock: {
                raw: 5043000000,
                fmt: "5.04B",
                longFmt: "5,043,000,000",
            },
        },
        {
            maxAge: 1,
            endDate: {
                raw: 1601424000,
                fmt: "2020-09-30",
            },
            netIncome: {
                raw: 331000000,
                fmt: "331M",
                longFmt: "331,000,000",
            },
            depreciation: {
                raw: 584000000,
                fmt: "584M",
                longFmt: "584,000,000",
            },
            changeToNetincome: {
                raw: 800000000,
                fmt: "800M",
                longFmt: "800,000,000",
            },
            changeToAccountReceivables: {
                raw: -314000000,
                fmt: "-314M",
                longFmt: "-314,000,000",
            },
            changeToLiabilities: {
                raw: 1275000000,
                fmt: "1.27B",
                longFmt: "1,275,000,000",
            },
            changeToInventory: {
                raw: -67000000,
                fmt: "-67M",
                longFmt: "-67,000,000",
            },
            changeToOperatingActivities: {
                raw: -259000000,
                fmt: "-259M",
                longFmt: "-259,000,000",
            },
            totalCashFromOperatingActivities: {
                raw: 2400000000,
                fmt: "2.4B",
                longFmt: "2,400,000,000",
            },
            capitalExpenditures: {
                raw: -1021000000,
                fmt: "-1.02B",
                longFmt: "-1,021,000,000",
            },
            otherCashflowsFromInvestingActivities: {
                raw: 122000000,
                fmt: "122M",
                longFmt: "122,000,000",
            },
            totalCashflowsFromInvestingActivities: {
                raw: -1039000000,
                fmt: "-1.04B",
                longFmt: "-1,039,000,000",
            },
            netBorrowings: {
                raw: -581000000,
                fmt: "-581M",
                longFmt: "-581,000,000",
            },
            otherCashflowsFromFinancingActivities: {
                raw: -86000000,
                fmt: "-86M",
                longFmt: "-86,000,000",
            },
            totalCashFromFinancingActivities: {
                raw: 4450000000,
                fmt: "4.45B",
                longFmt: "4,450,000,000",
            },
            effectOfExchangeRate: {
                raw: 86000000,
                fmt: "86M",
                longFmt: "86,000,000",
            },
            changeInCash: {
                raw: 5897000000,
                fmt: "5.9B",
                longFmt: "5,897,000,000",
            },
            issuanceOfStock: {
                raw: 5117000000,
                fmt: "5.12B",
                longFmt: "5,117,000,000",
            },
        },
        {
            maxAge: 1,
            endDate: {
                raw: 1593475200,
                fmt: "2020-06-30",
            },
            netIncome: {
                raw: 104000000,
                fmt: "104M",
                longFmt: "104,000,000",
            },
            depreciation: {
                raw: 567000000,
                fmt: "567M",
                longFmt: "567,000,000",
            },
            changeToNetincome: {
                raw: 491000000,
                fmt: "491M",
                longFmt: "491,000,000",
            },
            changeToAccountReceivables: {
                raw: -222000000,
                fmt: "-222M",
                longFmt: "-222,000,000",
            },
            changeToLiabilities: {
                raw: -180000000,
                fmt: "-180M",
                longFmt: "-180,000,000",
            },
            changeToInventory: {
                raw: 446000000,
                fmt: "446M",
                longFmt: "446,000,000",
            },
            changeToOperatingActivities: {
                raw: -290000000,
                fmt: "-290M",
                longFmt: "-290,000,000",
            },
            totalCashFromOperatingActivities: {
                raw: 964000000,
                fmt: "964M",
                longFmt: "964,000,000",
            },
            capitalExpenditures: {
                raw: -566000000,
                fmt: "-566M",
                longFmt: "-566,000,000",
            },
            otherCashflowsFromInvestingActivities: {
                raw: 122000000,
                fmt: "122M",
                longFmt: "122,000,000",
            },
            totalCashflowsFromInvestingActivities: {
                raw: -566000000,
                fmt: "-566M",
                longFmt: "-566,000,000",
            },
            netBorrowings: {
                raw: 111000000,
                fmt: "111M",
                longFmt: "111,000,000",
            },
            otherCashflowsFromFinancingActivities: {
                raw: -45000000,
                fmt: "-45M",
                longFmt: "-45,000,000",
            },
            totalCashFromFinancingActivities: {
                raw: 123000000,
                fmt: "123M",
                longFmt: "123,000,000",
            },
            effectOfExchangeRate: {
                raw: 38000000,
                fmt: "38M",
                longFmt: "38,000,000",
            },
            changeInCash: {
                raw: 559000000,
                fmt: "559M",
                longFmt: "559,000,000",
            },
            issuanceOfStock: {
                raw: 57000000,
                fmt: "57M",
                longFmt: "57,000,000",
            },
        },
    ],
    cashflowStatementHistoryAnnual: [
        {
            maxAge: 1,
            endDate: {
                raw: 1609372800,
                fmt: "2020-12-31",
            },
            netIncome: {
                raw: 721000000,
                fmt: "721M",
                longFmt: "721,000,000",
            },
            depreciation: {
                raw: 2322000000,
                fmt: "2.32B",
                longFmt: "2,322,000,000",
            },
            changeToNetincome: {
                raw: 2536000000,
                fmt: "2.54B",
                longFmt: "2,536,000,000",
            },
            changeToAccountReceivables: {
                raw: -652000000,
                fmt: "-652M",
                longFmt: "-652,000,000",
            },
            changeToLiabilities: {
                raw: 2423000000,
                fmt: "2.42B",
                longFmt: "2,423,000,000",
            },
            changeToInventory: {
                raw: -422000000,
                fmt: "-422M",
                longFmt: "-422,000,000",
            },
            changeToOperatingActivities: {
                raw: -1165000000,
                fmt: "-1.17B",
                longFmt: "-1,165,000,000",
            },
            totalCashFromOperatingActivities: {
                raw: 5943000000,
                fmt: "5.94B",
                longFmt: "5,943,000,000",
            },
            capitalExpenditures: {
                raw: -3232000000,
                fmt: "-3.23B",
                longFmt: "-3,232,000,000",
            },
            otherCashflowsFromInvestingActivities: {
                raw: 123000000,
                fmt: "123M",
                longFmt: "123,000,000",
            },
            totalCashflowsFromInvestingActivities: {
                raw: -3132000000,
                fmt: "-3.13B",
                longFmt: "-3,132,000,000",
            },
            netBorrowings: {
                raw: -2488000000,
                fmt: "-2.49B",
                longFmt: "-2,488,000,000",
            },
            otherCashflowsFromFinancingActivities: {
                raw: -225000000,
                fmt: "-225M",
                longFmt: "-225,000,000",
            },
            totalCashFromFinancingActivities: {
                raw: 9973000000,
                fmt: "9.97B",
                longFmt: "9,973,000,000",
            },
            effectOfExchangeRate: {
                raw: 334000000,
                fmt: "334M",
                longFmt: "334,000,000",
            },
            changeInCash: {
                raw: 13118000000,
                fmt: "13.12B",
                longFmt: "13,118,000,000",
            },
            issuanceOfStock: {
                raw: 12686000000,
                fmt: "12.69B",
                longFmt: "12,686,000,000",
            },
        },
        {
            maxAge: 1,
            endDate: {
                raw: 1577750400,
                fmt: "2019-12-31",
            },
            netIncome: {
                raw: -862000000,
                fmt: "-862M",
                longFmt: "-862,000,000",
            },
            depreciation: {
                raw: 2092000000,
                fmt: "2.09B",
                longFmt: "2,092,000,000",
            },
            changeToNetincome: {
                raw: 1336000000,
                fmt: "1.34B",
                longFmt: "1,336,000,000",
            },
            changeToAccountReceivables: {
                raw: -367000000,
                fmt: "-367M",
                longFmt: "-367,000,000",
            },
            changeToLiabilities: {
                raw: 1447000000,
                fmt: "1.45B",
                longFmt: "1,447,000,000",
            },
            changeToInventory: {
                raw: -429000000,
                fmt: "-429M",
                longFmt: "-429,000,000",
            },
            changeToOperatingActivities: {
                raw: -1000000000,
                fmt: "-1B",
                longFmt: "-1,000,000,000",
            },
            totalCashFromOperatingActivities: {
                raw: 2405000000,
                fmt: "2.4B",
                longFmt: "2,405,000,000",
            },
            capitalExpenditures: {
                raw: -1432000000,
                fmt: "-1.43B",
                longFmt: "-1,432,000,000",
            },
            otherCashflowsFromInvestingActivities: {
                raw: 46000000,
                fmt: "46M",
                longFmt: "46,000,000",
            },
            totalCashflowsFromInvestingActivities: {
                raw: -1436000000,
                fmt: "-1.44B",
                longFmt: "-1,436,000,000",
            },
            netBorrowings: {
                raw: 798000000,
                fmt: "798M",
                longFmt: "798,000,000",
            },
            otherCashflowsFromFinancingActivities: {
                raw: -380000000,
                fmt: "-380M",
                longFmt: "-380,000,000",
            },
            totalCashFromFinancingActivities: {
                raw: 1529000000,
                fmt: "1.53B",
                longFmt: "1,529,000,000",
            },
            effectOfExchangeRate: {
                raw: 8000000,
                fmt: "8M",
                longFmt: "8,000,000",
            },
            changeInCash: {
                raw: 2506000000,
                fmt: "2.51B",
                longFmt: "2,506,000,000",
            },
            issuanceOfStock: {
                raw: 1111000000,
                fmt: "1.11B",
                longFmt: "1,111,000,000",
            },
        },
        {
            maxAge: 1,
            endDate: {
                raw: 1546214400,
                fmt: "2018-12-31",
            },
            netIncome: {
                raw: -976000000,
                fmt: "-976M",
                longFmt: "-976,000,000",
            },
            depreciation: {
                raw: 1888000000,
                fmt: "1.89B",
                longFmt: "1,888,000,000",
            },
            changeToNetincome: {
                raw: 969000000,
                fmt: "969M",
                longFmt: "969,000,000",
            },
            changeToAccountReceivables: {
                raw: -497000000,
                fmt: "-497M",
                longFmt: "-497,000,000",
            },
            changeToLiabilities: {
                raw: 2203000000,
                fmt: "2.2B",
                longFmt: "2,203,000,000",
            },
            changeToInventory: {
                raw: -1023000000,
                fmt: "-1.02B",
                longFmt: "-1,023,000,000",
            },
            changeToOperatingActivities: {
                raw: -625000000,
                fmt: "-625M",
                longFmt: "-625,000,000",
            },
            totalCashFromOperatingActivities: {
                raw: 2098000000,
                fmt: "2.1B",
                longFmt: "2,098,000,000",
            },
            capitalExpenditures: {
                raw: -2319000000,
                fmt: "-2.32B",
                longFmt: "-2,319,000,000",
            },
            otherCashflowsFromInvestingActivities: {
                raw: 46000000,
                fmt: "46M",
                longFmt: "46,000,000",
            },
            totalCashflowsFromInvestingActivities: {
                raw: -2337000000,
                fmt: "-2.34B",
                longFmt: "-2,337,000,000",
            },
            netBorrowings: {
                raw: 89000000,
                fmt: "89M",
                longFmt: "89,000,000",
            },
            otherCashflowsFromFinancingActivities: {
                raw: 189000000,
                fmt: "189M",
                longFmt: "189,000,000",
            },
            totalCashFromFinancingActivities: {
                raw: 574000000,
                fmt: "574M",
                longFmt: "574,000,000",
            },
            effectOfExchangeRate: {
                raw: -23000000,
                fmt: "-23M",
                longFmt: "-23,000,000",
            },
            changeInCash: {
                raw: 312000000,
                fmt: "312M",
                longFmt: "312,000,000",
            },
            issuanceOfStock: {
                raw: 296000000,
                fmt: "296M",
                longFmt: "296,000,000",
            },
        },
        {
            maxAge: 1,
            endDate: {
                raw: 1514678400,
                fmt: "2017-12-31",
            },
            netIncome: {
                raw: -1962000000,
                fmt: "-1.96B",
                longFmt: "-1,962,000,000",
            },
            depreciation: {
                raw: 1636000000,
                fmt: "1.64B",
                longFmt: "1,636,000,000",
            },
            changeToNetincome: {
                raw: 671000000,
                fmt: "671M",
                longFmt: "671,000,000",
            },
            changeToAccountReceivables: {
                raw: -25000000,
                fmt: "-25M",
                longFmt: "-25,000,000",
            },
            changeToLiabilities: {
                raw: 857000000,
                fmt: "857M",
                longFmt: "857,000,000",
            },
            changeToInventory: {
                raw: -179000000,
                fmt: "-179M",
                longFmt: "-179,000,000",
            },
            changeToOperatingActivities: {
                raw: -1150000000,
                fmt: "-1.15B",
                longFmt: "-1,150,000,000",
            },
            totalCashFromOperatingActivities: {
                raw: -61000000,
                fmt: "-61M",
                longFmt: "-61,000,000",
            },
            capitalExpenditures: {
                raw: -4081000000,
                fmt: "-4.08B",
                longFmt: "-4,081,000,000",
            },
            otherCashflowsFromInvestingActivities: {
                raw: 46000000,
                fmt: "46M",
                longFmt: "46,000,000",
            },
            totalCashflowsFromInvestingActivities: {
                raw: -4196000000,
                fmt: "-4.2B",
                longFmt: "-4,196,000,000",
            },
            netBorrowings: {
                raw: 3385000000,
                fmt: "3.38B",
                longFmt: "3,385,000,000",
            },
            otherCashflowsFromFinancingActivities: {
                raw: 371000000,
                fmt: "371M",
                longFmt: "371,000,000",
            },
            totalCashFromFinancingActivities: {
                raw: 4415000000,
                fmt: "4.42B",
                longFmt: "4,415,000,000",
            },
            effectOfExchangeRate: {
                raw: 40000000,
                fmt: "40M",
                longFmt: "40,000,000",
            },
            changeInCash: {
                raw: 198000000,
                fmt: "198M",
                longFmt: "198,000,000",
            },
            issuanceOfStock: {
                raw: 659000000,
                fmt: "659M",
                longFmt: "659,000,000",
            },
        },
    ],
};

function convertKey(str) {
    str = str.replace(" ", "");
    str = str.charAt(0).toLowerCase() + str.substring(1);
    return str;
}
export default function Financial() {
    const [year, setYear] = React.useState("Quarterly");
    const [statement, setStatement] = React.useState("IncomeStatement");

    const yearOptions = ["Quarterly", "Annual"];
    const statementOptions = [
        "IncomeStatement",
        "BalanceSheet",
        "CashflowStatement",
    ];

    const incomeStatementColumn = {
        "Total Revenue": "totalRevenue",
        "Cost Of Revenue": "costOfRevenue",
        "Gross Profit": "grossProfit",
    };

    console.table(data.incomeStatementHistoryAnnual);

    return (
        <div className="Financial">
            <ul className="StatementOptions" id="StatementOptions">
                {statementOptions.map((s, idx) => (
                    <li
                        className={clsx({
                            Options: true,
                            Current: statement === s,
                        })}
                        onClick={() => setStatement(s)}
                        key={idx}
                    >
                        {s}
                    </li>
                ))}
            </ul>
            <ul className="YearOptions" id="YearOptions">
                {yearOptions.map((y, idx) => (
                    <li
                        className={clsx({
                            Options: true,
                            Current: year === y,
                        })}
                        onClick={() => setYear(y)}
                        key={idx}
                    >
                        {y}
                    </li>
                ))}
            </ul>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {data.incomeStatementHistoryAnnual.map((d, idx) => (
                            <th>{d.endDate.fmt}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(incomeStatementColumn).map((c, idx) => (
                        <tr key={idx} className="Column">
                            <td>{c}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
