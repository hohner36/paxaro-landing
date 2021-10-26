import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import { Container } from '../Container';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/images/logo.svg';
import { useRouter } from 'next/dist/client/router';
import { ActiveLink } from '../ActiveLink';
import { Button } from '../../ui/components/Button';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import Logo from '../../ui/icons/Logo';
import LogoMini from '../../ui/icons/LogoMini';
import { useIsDesktop } from '../../hooks/useIsDesktop';
import SocialList from '../SocialList/SocialList';
import Headroom from 'react-headroom';

interface IHeaderWrapper {
  isActiveMenu: boolean;
}

const Header: FC = ({ children }) => {
  const { t } = useTranslation('header');
  const router = useRouter();
  const isDesktop = useIsDesktop();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  function openMenu() {
    setIsOpenMenu(!isOpenMenu);
  }
  function closeMobileMenuClick(e: MouseEvent) {
    if (window.innerWidth > 900) {
      return false;
    }
    const target = e.target as Element;
    const parentTarget = target.closest('.mobile-menu');
    if (!parentTarget && isOpenMenu) {
      setIsOpenMenu(false);
    }
  }
  useEffect(() => {
    window.innerWidth > 900 ? setIsOpenMenu(true) : setIsOpenMenu(false);
  }, []);
  useEffect(() => {
    window.addEventListener('click', closeMobileMenuClick);
    return () => {
      window.removeEventListener('click', closeMobileMenuClick);
    };
  }, []);
  return (
    <Headroom>
      <Root>
        <HeaderBurgerNavContainer>
          <Link href="/" passHref>
            <a>
              <LogoMini />
            </a>
          </Link>
          <BurgerBtn className={isOpenMenu ? 'active' : ''} onClick={openMenu}>
            <span></span>
          </BurgerBtn>
        </HeaderBurgerNavContainer>
        <HeaderWrapper isActiveMenu={isOpenMenu}>
          <HeaderScroller>
            <HeaderTop>
              <HeaderTopContainer>
                <Link href="/" passHref>
                  <HeaderLogoLink>
                    <Image src={logo} alt={t('logoAlt')} />
                    {/* <Logo width={148} height={46} /> */}
                  </HeaderLogoLink>
                </Link>
                <HeaderTopNav>
                  <HeaderTopItem>
                    <ActiveLink href="/" activeClassName="active" passHref>
                      <HeaderTopLink>{t('main.aboutProduct')}</HeaderTopLink>
                    </ActiveLink>
                  </HeaderTopItem>
                  <HeaderTopItem>
                    <ActiveLink href="/blog" activeClassName="active" passHref>
                      <HeaderTopLink>{t('main.blog')}</HeaderTopLink>
                    </ActiveLink>
                  </HeaderTopItem>
                  <HeaderTopItem>
                    <ActiveLink href="/about" activeClassName="active" passHref>
                      <HeaderTopLink>{t('main.aboutCompany')}</HeaderTopLink>
                    </ActiveLink>
                  </HeaderTopItem>
                </HeaderTopNav>
                {isDesktop && (
                  <HeaderButtonsWrap>
                    <HeaderButtonTitle>
                      {t('main.accountTitle')}
                    </HeaderButtonTitle>
                    <HeaderButtons>
                      <Link
                        href="https://nextjs.org/docs/advanced-features/i18n-routing"
                        passHref
                      >
                        <HeaderButtonRegistration
                          isLink
                          text={t('main.registration')}
                        ></HeaderButtonRegistration>
                      </Link>
                      <Link
                        href="https://nextjs.org/docs/advanced-features/i18n-routing"
                        passHref
                      >
                        <HeaderLinkLogin>
                          <span>{t('main.login')}</span>
                        </HeaderLinkLogin>
                      </Link>
                      <LanguageSwitcher />
                    </HeaderButtons>
                  </HeaderButtonsWrap>
                )}
              </HeaderTopContainer>
            </HeaderTop>
            {children && (
              <HeaderBottom>
                <HeaderBottomContainer>
                  {children}
                  {!isDesktop && (
                    <HeaderButtonsWrap>
                      <HeaderButtonTitle>
                        {t('main.accountTitle')}
                      </HeaderButtonTitle>
                      <HeaderButtons>
                        <Link
                          href="https://nextjs.org/docs/advanced-features/i18n-routing"
                          passHref
                        >
                          <HeaderButtonRegistration
                            isLink
                            text={t('main.registration')}
                          ></HeaderButtonRegistration>
                        </Link>
                        <Link
                          href="https://nextjs.org/docs/advanced-features/i18n-routing"
                          passHref
                        >
                          <HeaderLinkLogin>
                            <span>{t('main.login')}</span>
                          </HeaderLinkLogin>
                        </Link>
                      </HeaderButtons>
                    </HeaderButtonsWrap>
                  )}
                </HeaderBottomContainer>
              </HeaderBottom>
            )}
            {!isDesktop && (
              <>
                <StyledSocialList />
                <StyledLanguageSwitcher />
              </>
            )}
          </HeaderScroller>
        </HeaderWrapper>
      </Root>
    </Headroom>
  );
};

const Root = styled.header`
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
  transition: transform 0.5s ease-out;
  will-change: transform; */
  background: var(--black3);
  box-shadow: 0px 30px 36px -15px rgba(0, 0, 0, 0.15);
  @media (max-width: 900px) {
  }
`;
const HeaderScroller = styled.div`
  @media (max-width: 900px) {
    padding-bottom: 200px;
    overflow: scroll;
  }
`;

const HeaderWrapper = styled.div.attrs<IHeaderWrapper>((props) => ({
  className: props.isActiveMenu ? 'mobile-menu active' : 'mobile-menu',
}))`
  display: ${(props: IHeaderWrapper) =>
    props.isActiveMenu ? 'block' : 'none'};
  @media (max-width: 900px) {
    display: ${(props: IHeaderWrapper) =>
      props.isActiveMenu ? 'flex' : 'none'};
    flex-direction: column;
    height: 100vh;
  }
`;

const HeaderBurgerNav = styled.div``;
const HeaderBurgerNavContainer = styled(Container)`
  display: none;
  align-items: center;
  justify-content: space-between;
  padding-top: 22px;
  padding-bottom: 22px;
  @media (max-width: 900px) {
    display: flex;
  }
`;
const HeaderTop = styled.div``;
const HeaderTopContainer = styled(Container)`
  padding-top: 22px;
  padding-bottom: 22px;
  display: flex;
  align-items: center;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
    padding-bottom: 0;
  }
`;
const HeaderLogoLink = styled.a`
  margin-right: 42px;
  @media (max-width: 1024px) {
    margin-right: 25px;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;
const HeaderTopNav = styled.ul`
  display: flex;
  align-items: center;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 24px;
    margin-bottom: 24px;
    border-bottom: 1px solid rgba(153, 153, 153, 0.3);
  }
`;
const HeaderTopItem = styled.li`
  margin-right: 30px;
  &:last-child {
    margin-right: 0;
  }
  @media (max-width: 1024px) {
    margin-right: 15px;
  }
  @media (max-width: 900px) {
    margin-right: 0;
    margin-bottom: 18px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
const HeaderTopLink = styled.a`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.01em;
  color: var(--white);
  &.active {
    color: var(--green);
  }
  @media (max-width: 900px) {
    font-size: 24px;
    line-height: 34px;
  }
`;
const HeaderButtonsWrap = styled.div`
  margin-left: auto;
  @media (max-width: 900px) {
    margin-left: 0;
    margin-bottom: 24px;
  }
`;
const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderButtonTitle = styled.p`
  font-weight: bold;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: 0.01em;
  color: var(--white);
  margin-bottom: 18px;
  display: none;
  @media (max-width: 900px) {
    display: block;
  }
`;
const HeaderButtonRegistration = styled(Button)`
  margin-right: 14px;
  font-size: 14px;
  line-height: 19px;
  padding-top: 11px;
  padding-bottom: 11px;
`;

const HeaderLinkLogin = styled.a`
  border-radius: 8px;
  background: var(--greenGradient);
  display: inline-flex;
  padding: 2px;
  min-height: 43px;
  min-width: 76px;
  color: var(--white);
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  margin-right: 14px;

  span {
    background-color: var(--black3);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 8px;
  }
`;
const HeaderBottom = styled.div`
  background-color: var(--black2);
  @media (max-width: 900px) {
    background-color: transparent;
  }
`;
const HeaderBottomContainer = styled(Container)`
  padding-top: 11px;
  padding-bottom: 11px;
  @media (max-width: 900px) {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const BurgerBtn = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: relative;
  z-index: 1;

  span,
  & span::before,
  & span::after {
    position: absolute;
    width: 18px;
    height: 2px;
    background-color: var(--white);
    transition: all 0.3s ease;
  }
  & span::before {
    content: '';
    left: 0;
    top: -8px;
  }
  & span::after {
    content: '';
    left: 0;
    top: 8px;
  }

  &.active {
    span {
      transform: rotate(45deg);
      &::before {
        top: 0;
        transform: rotate(0);
      }
      &::after {
        top: 0;
        transform: rotate(90deg);
      }
    }
  }
  @media (max-width: 900px) {
    display: flex;
  }
`;

const StyledLanguageSwitcher = styled(LanguageSwitcher)`
  @media (max-width: 900px) {
    /* position: fixed;
    left: 0;
    right: 0;
    bottom: 0; */
  }
`;

const StyledSocialList = styled(SocialList)`
  margin-bottom: 24px;
  padding-left: 20px;
  margin-top: auto;
`;

export default Header;

// #menu-toggle:checked ~ .menu-btn > span::before{
//   top: 0;
//   transform: rotate(0);
// }
// #menu-toggle:checked ~ .menu-btn > span::after{
//   top: 0;
//   transform: rotate(90deg);
// }
// #menu-toggle:checked ~ .menubox{
//   visibility: visible;
//   left: 0;
// }
