import Menu from './_component/Menu';
import SearchBox from './_component/SearchBox';
import Trends from './_component/Trends';
import styles from './style.module.scss';
import classNames from 'classnames/bind';
type props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};
export default function Layout({ children, modal }: props) {
  const cx = classNames.bind(styles);
  return (
    <div className={cx('wrap')}>
      <div className={cx('left')}>
        <div className={cx('inner')}>
          <Menu />
        </div>
      </div>
      <div className={cx('center')}>
        {children}
        {modal}
      </div>
      <div className={cx('right')}>
        <div className={cx('inner')}>
          <SearchBox />
          <Trends />
        </div>
      </div>
    </div>
  );
}
