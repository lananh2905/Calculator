// styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    width: '90%',  
    marginTop: 10,
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  titleCal:{
    fontSize: 28,
    color: '#33b5e5',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  titleHis: {
    fontSize: 22,
    color: '#C0C0C0',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  history: {
    height: 100,
    width: '90%',
    marginTop: 10,
    backgroundColor: '#000000',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'flex-up',
    alignItems: 'flex-end',
  },
  historyText: {
    color: '#BBBBBB',
    fontSize: 18,
    fontWeight: 'bold',
  },
  caculateContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 0,
    alignItems: 'center',
  },
  display: {
    backgroundColor: '#000000',
    width: '90%',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  expression: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  expressionSmall: {
    fontSize: 26,
    color: '#BBBBBB',
  },
  result: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  buttons: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  basicButton: {
    width: '22%',
    padding: 20,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#555555',
    alignItems: 'center',
  },
  scientificButton: {
    width: '17%',
    padding: 14,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#555555',
    alignItems: 'center',
  },
  acButton: {
    backgroundColor: '#ffb3b3',
  },
  equalsButton: {
    backgroundColor: '#33b5e5',
  },
  syncButton:{
    backgroundColor: '#33b5e5',
  },
  basicButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  scientificButtonText: {
    fontSize: 19,
    color: '#FFFFFF',
  }
});
