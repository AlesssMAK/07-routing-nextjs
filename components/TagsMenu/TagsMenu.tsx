import css from './TagsMenu.module.css';

const TagsMenu = () => {
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton}>Notes ▾</button>
      <ul className={css.menuList}>
        {/* список тегів */}
        <li className={css.menuItem}>
          <a
            href={`url до сторінки за відповідним тегом`}
            className={css.menuLink}
          >
            Назва тегу
          </a>
        </li>
      </ul>
    </div>
  );
};

export default TagsMenu;
