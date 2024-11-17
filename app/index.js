import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, ScrollView } from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { startAnimation, resetAnimation } from './animation';

export default function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [isResultShown, setIsResultShown] = useState(false);
  const [isChangeShown, setIsChangeShown] = useState(false);
  const scrollViewRef = useRef(null);
  const [is2nd, set2nd] = useState(false);
  const [israd, setrad] = useState('deg');

  const resultFontSize = useRef(new Animated.Value(32)).current;
  const resultColor = useRef(new Animated.Value(0)).current;

  const addToHistory = (newEntry) => {
    setHistory((prevHistory) => [...prevHistory, newEntry]);
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };
  
  function factorial(n) {
    if (!Number.isInteger(n)) return '-=';
    if (n < 0) return '-=';
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  const calculate = (exp) => {
    exp = exp.replace(/e/g, "Math.E")
             .replace(/π/g, "Math.PI")
             .replace("^", "**")
             .replace(":R", "%")
             .replace("x", "*")
             .replace(/(\d+(\.\d+)?)!/g, (_, num) => (factorial(Number(num))))
             .replace(/sin\(/g, "Math.sin(")
             .replace(/cos\(/g, "Math.cos(")
             .replace(/tan\(/g, "Math.tan(")
             .replace(/log\(/g, "Math.log10(")
             .replace(/ln\(/g, "Math.log(")
             .replace(/arcMath.sin\(/g, "Math.asin(")
             .replace(/arcMath.cos\(/g, "Math.acos(")
             .replace(/arcMath.tan\(/g, "Math.atan(");

    if (israd === 'deg') {
      exp = exp.replace(/Math.sin\(/g, "Math.sin((Math.PI/180)*")
               .replace(/Math.cos\(/g, "Math.cos((Math.PI/180)*")
               .replace(/Math.tan\(/g, "Math.tan((Math.PI/180)*")
               .replace(/Math.asin\(/g, "(180/Math.PI)*Math.asin(")
               .replace(/Math.acos\(/g, "(180/Math.PI)*Math.acos(")
               .replace(/Math.atan\(/g, "(180/Math.PI)*Math.atan(");
    }

    try {
      let calculatedResult = eval(exp);
      if (Number.isFinite(calculatedResult) && !Number.isInteger(calculatedResult)) {
        calculatedResult = parseFloat(calculatedResult.toFixed(6));
      }
      return calculatedResult;
    } catch (error) {
      return 'Error';
    }
  }

  const handlePress = (value) => {
    setIsResultShown(false);
    resetAnimation(resultFontSize, resultColor);

    if (value === 'Ac') {
      setExpression('');
      setResult('');
      setHistory([]);
    } 
    
    else if (value === '⌫') {
      setExpression(expression.slice(0, -1));
    } 
    
    else if (value === 'sync') {
      setIsChangeShown(!isChangeShown);
    }
    
    else if (value == 'deg') {
      setrad('rad');
    }
    
    else if (value == 'rad'){
      setrad('deg');
    }

    else if (value === 'sin' || value === 'cos' || value === 'tan' || value === 'log' || value == 'ln' || value === 'arcsin' || value === 'arccos' || value === 'arctan') {
      setExpression(expression + value + '(');
    } 
      
    else if (value === '2nd') {
      set2nd(!is2nd);
    }
    
    else if (value === '=') {
      let calculatedResult = calculate(expression);
      setResult(`${calculatedResult}`);
      addToHistory(expression + '=' + calculatedResult);
      setIsResultShown(true);
      startAnimation(resultFontSize, resultColor);
    } 
    
    else if (value === '+' || value === '-' || value === 'x' || value === ':R' || value === '/'){
      if (isResultShown){
        setExpression(result + value);
      } else {
        setExpression(expression + value);
      }
    } 
    
    else if (value === '1/x') {
      setExpression(expression + '^(-1)');
    }

    else if (value === '√x') {
      setExpression(expression + '^(1/2)');
    }

    else if (value === 'x^y') {
      setExpression(expression + '^')
    }

    else if (value === 'x!') {
      setExpression(expression + '!')
    }
    
    else {
      let exp = expression + value;
      setExpression(exp);
      let calculatedResult = calculate(exp);
      if (calculatedResult !== 'Error'){
        setResult(calculatedResult);
      }
    }
  };

  const animatedColor = resultColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#BBBBBB', '#fff'],
  });

  const basicButtons = ['Ac', '⌫', ':R', '/',
                        '7', '8', '9', 'x',
                        '4', '5', '6', '-',
                        '1', '2', '3', '+',
                        'sync', '0', '.', '='];

  const scientificButtons = ['2nd', israd, 'sin', 'cos', 'tan',
                             'x^y', 'log', 'ln', '(', ')',
                             '√x', 'Ac', '⌫', ':R', '/',
                             'x!', '7', '8', '9', 'x',
                             '1/x', '4', '5', '6', '-',
                             'π', '1', '2', '3', '+',
                             'sync', 'e', '0', '.', '='];

  const is2ndButtons = ['2nd', israd, 'arcsin', 'arccos', 'arctan',
                        'x^y', 'log', 'ln', '(', ')',
                        '√x', 'Ac', '⌫', ':R', '/',
                        'x!', '7', '8', '9', 'x',
                        '1/x', '4', '5', '6', '-',
                        'π', '1', '2', '3', '+',
                        'sync', 'e', '0', '.', '='];

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleCal}>Calculator</Text>
        <Text style={styles.titleHis}>History</Text>
      </View>

      <View style={styles.history}>
        <ScrollView ref={scrollViewRef}>
          {history.map((item, index) => (
            <Text key={index} style={styles.historyText}>{item}</Text>
          ))}
        </ScrollView>
      </View>

      <View style={styles.caculateContainer}>
        <View style={styles.display}>
          <Text style={[styles.expression, isResultShown && styles.expressionSmall]}>{expression}</Text>
          <Animated.Text style={[styles.result, { fontSize: resultFontSize, color: animatedColor }]}>
            = {result}
          </Animated.Text>
        </View>

        <View style={styles.buttons}>
          {(isChangeShown ? 
              (is2nd ? is2ndButtons : scientificButtons) : 
              basicButtons).map((btn) => (
            <TouchableOpacity
              key={btn} 
              style={[
                styles.basicButton,
                isChangeShown && styles.scientificButton,
                btn === 'Ac' ? styles.acButton : (btn === '=' || btn === 'sync') ? styles.equalsButton : {}
              ]}
              onPress={() => handlePress(btn)}
            >
              {btn === 'sync' ? (
                <Icon name="sync" size={24} />
              ) : (
                <Text style={[styles.basicButtonText, isChangeShown && styles.scientificButtonText]}>{btn}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
