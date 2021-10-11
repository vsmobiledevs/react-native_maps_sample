import {Platform, StyleSheet} from 'react-native';
import {WP, HP, colors, size} from '../../../utilities';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingBottom: 15,
    backgroundColor: colors.white,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: HP('3'),
    backgroundColor: colors.p1,
    justifyContent: 'space-between',
    padding: Platform.OS === 'android' ? HP('2.5') : HP('6'),
  },
  titleTxtStyle: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.white,
  },
  titleTxtStyle1: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.p1,
  },
  imageStyles: {
    width: WP('20%'),
    height: HP('20%'),
    borderRadius: 50,
  },
  cardView: {
    flexGrow: 1,
    borderRadius: 15,
  },
  txtStyle: {
    marginBottom: 7,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  recordsTextStyle: {
    color: colors.b1,
    fontWeight: '700',
    alignSelf: 'center',
    fontSize: size.large,
  },
});

export default styles;
