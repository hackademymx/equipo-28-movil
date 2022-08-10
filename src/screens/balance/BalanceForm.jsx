import React from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View, Image} from "react-native";
import { getMonth } from "../../../utils/months";

const ImgLogo = require("../../../assets/logoMNEG.png");

const payload = {
  total_acc: {
    current_balance__sum: 4500.0,
  },
  balances: {
    balance_2022: [
      {
        balance_1_2022: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
      {
        balance_2_2022: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
      {
        balance_3_2022: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
      {
        balance_4_2022: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
      {
        balance_5_2022: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
      {
        balance_6_2022: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
      {
        balance_7_2022: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
      {
        balance_8_2022: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
      {
        balance_9_2022: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
      {
        balance_10_2022: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
      {
        balance_11_2022: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
      {
        balance_12_2022: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
    ],
    balance_2023: [
      {
        balance_1_2023: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
      {
        balance_2_2023: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
      {
        balance_3_2023: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
      {
        balance_4_2023: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
      {
        balance_5_2023: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
      {
        balance_6_2023: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
      {
        balance_7_2023: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
      {
        balance_8_2023: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
      {
        balance_9_2023: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
      {
        balance_10_2023: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
      {
        balance_11_2023: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
      {
        balance_12_2023: {
          balance: 0,
          incomes: 0,
          expenses: 0,
        },
      },
    ],
  },
};

export default function App() {
  const [data, setData] = React.useState({});
  const [years, setYears] = React.useState([]);

  React.useEffect(() => {
    setData(payload);

    const totalYears = [];
    for (let property in payload.balances) {
      const year = property.split("_")[1];
      totalYears.push(year);
    }
    setYears(totalYears);
  }, []);

  const getBalanceDetail = async () => {
    try {
      let balId = route.params.id;
      console.log("Id de balance" + balId);
      setLoading(true);
      const response = await request({
        method: "get",
        url: `/finances/${balId}`,
      }); //sin el último slash

      setLoading(false);
      setAccount(response.data);
      //console.log(account);
    } catch (error) {
      //const data = error.response.data;
      setLoading(false);
      // setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);
    }
  };

  return (
      <ScrollView style={styles.container}>
          {years.map((item) => (
        <View key={item}>
          <Image source={ImgLogo} style={styles.logoMoney} />
          <Text style={styles.title}>{item}</Text>
          {data.balances[`balance_${item}`].map((month, idx) => {
            const monthString = Object.keys(month)[0];
            const monthNumber = monthString.split("_")[1];
            const monthName = getMonth(parseInt(monthNumber));
            const myMonthData = month[monthString];
            return (
              <View style={styles.card} key={`month_${idx}`}>
                <Text style={styles.subtitle}>{monthName}</Text>
                <View style={styles.row}>
                  <Text style={styles.caption}>Balance:</Text>
                  <Text>{myMonthData.balance}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.caption}>Ingresos:</Text>
                  <Text>{myMonthData.incomes}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.caption}>Gastos:</Text>
                  <Text>{myMonthData.expenses}</Text>
                </View>
              </View>
            );
          })}
        </View>
      ))}
    </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    padding: 20,
    backgroundColor: "#040404",
  },
  logoMoney: {
    height: 90,
    width: 90,
    alignSelf: "flex-end",
    margin: 0,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#fff",
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 19,
    letterSpacing: 1,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#c1c1c1",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 5,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    lineHeight: 18,
  },
  caption: {
    fontSize: 16,
    fontWeight: "600",
  },
});