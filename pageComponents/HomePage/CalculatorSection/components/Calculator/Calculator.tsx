import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { Field, Form, Formik, FormikProps, useField } from 'formik';
import Slider, { Handle, Range, SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import currency from 'currency.js';
import { useTranslation } from 'react-i18next';
import { Button } from '@/ui/components/Button';
import { Chart } from './Chart';
import { useIsMouted } from '@/hooks/useIsMounted';

const SelectUiNoSSR = dynamic(
  () => import('@/ui/components/SelectUI/SelectUI'),
  {
    ssr: false,
  }
);

interface ICalculatorProps {
  className?: string;
}

interface Values {
  porfolio_type: string;
  date_days: string;
}

const marks: { [key: string]: any } = {
  i30: {
    0: 0,
    5: 1000,
    14: 5000,
    28: 10000,
    42: 50000,
    56: 100000,
    70: 500000,
    100: 1000000,
  },
  i50: {
    0: 0,
    5: 1000,
    14: 2000,
    28: 5000,
    42: 10000,
    56: 50000,
    70: 100000,
    84: 500000,
    100: 1000000,
  },
  i100: {
    0: 0,
    5: 1000,
    12: 2000,
    24: 2500,
    36: 5000,
    48: 10000,
    60: 50000,
    72: 100000,
    90: 500000,
    100: 1000000,
  },
};

const secondData = [
  {
    name: '2001-12-27',
    value: 2400,
  },
  {
    name: '2002-01-27',
    value: 1398,
  },
  {
    name: '2002-01-27',
    value: 9800,
  },
  {
    name: '2002-01-27',
    value: 3908,
  },
  {
    name: '2002-01-27',
    value: 4800,
  },
  {
    name: '2002-01-27',
    value: 3800,
  },
  {
    name: '2002-01-27',
    value: 4300,
  },
  {
    name: '2002-01-27',
    value: 4800,
  },
  {
    name: '2002-01-27',
    value: 3800,
  },
  {
    name: '2002-01-27',
    value: 5639,
  },
  {
    name: '2002-01-27',
    value: 1639,
  },
  {
    name: '2002-01-27',
    value: 3639,
  },
];

const Calculator: FC<ICalculatorProps> = ({ className }) => {
  const isMounted = useIsMouted();
  const { t } = useTranslation('calculator');
  const [cashValue, setCashValue] = useState(0);

  const portfolioTypeOptions = [
    { value: 'i30', label: 'i30' },
    { value: 'i50', label: 'i50' },
    { value: 'i100', label: 'i100' },
  ];
  const dateDaysOptions = [
    { value: '30', label: t('calculator.month') },
    { value: '180', label: t('calculator.halfYear') },
    { value: '360', label: t('calculator.year') },
  ];

  function submit(e: any) {
    console.log('submit', {
      ...e,
      cash: cashValue,
    });
  }

  const handle = (props: any, type: any) => {
    const { value, dragging, index, ...restProps } = props;
    const formatedValue = currency(marks[type][value], {
      separator: '.',
      precision: 0,
    }).format();

    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={formatedValue}
        visible={true}
        placement="bottom"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };

  function onChange(e: any, type: string) {
    setCashValue(marks[type][e]);
  }

  return isMounted ? (
    <Root className={className}>
      <Wrapper>
        <Formik
          initialValues={{
            porfolio_type: 'i30',
            date_days: '30',
          }}
          onSubmit={submit}
        >
          {({ values }: FormikProps<Values>) => {
            return (
              <Form>
                <Head>
                  <HeadSection>
                    <HeadLabel>{t('calculator.index')}</HeadLabel>
                    <SelectUiNoSSR
                      name="porfolio_type"
                      options={portfolioTypeOptions}
                      id="porfolio_type"
                    />
                  </HeadSection>
                  <HeadSection>
                    <HeadLabel>{t('calculator.period')}</HeadLabel>
                    <SelectUiNoSSR
                      name="date_days"
                      options={dateDaysOptions}
                      id="date_days"
                    />
                  </HeadSection>

                  <FullHeadSection>
                    <HeadLabel>{t('calculator.investmentsAmount')}</HeadLabel>
                    <SliderWrapper>
                      <SliderBorders>
                        {currency(
                          marks[values.porfolio_type][
                            Object.keys(marks[values.porfolio_type])[0]
                          ]
                        ).format()}
                      </SliderBorders>
                      <StyledSlider
                        marks={marks[values.porfolio_type]}
                        step={null}
                        onChange={(e) => {
                          onChange(e, values.porfolio_type);
                        }}
                        handle={(e) => handle(e, values.porfolio_type)}
                      />
                      <SliderBorders>
                        {currency(
                          marks[values.porfolio_type][
                            Object.keys(marks[values.porfolio_type])[
                              Object.keys(marks[values.porfolio_type]).length -
                                1
                            ]
                          ],
                          {
                            separator: '.',
                            precision: 0,
                          }
                        ).format()}
                      </SliderBorders>
                    </SliderWrapper>
                  </FullHeadSection>
                </Head>
                <StyledChart data={secondData} />
                <Footer>
                  <ProfitBlock>
                    <ProfitBlockText>
                      {t('calculator.profit')}
                      <span>$1,199</span>
                    </ProfitBlockText>
                  </ProfitBlock>
                  <StyledButton
                    type="submit"
                    text={t('calculator.calculate')}
                  />
                </Footer>
              </Form>
            );
          }}
        </Formik>
      </Wrapper>
    </Root>
  ) : null;
};

const Root = styled.div`
  background: var(--black2);
  border-radius: 50px;
`;

const Wrapper = styled.div`
  padding: 40px 60px;

  @media (max-width: 1024px) {
    padding: 30px;
  }
`;

const Head = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const HeadSection = styled.div`
  min-width: 150px;
  margin-right: 40px;
  &:last-child {
    margin-right: 0;
  }
`;
const FullHeadSection = styled(HeadSection)`
  width: 100%;
  max-width: 440px;
  @media (max-width: 1024px) {
    max-width: none;
    margin-top: 20px;
  }
`;

const HeadLabel = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;

  margin-bottom: 12px;

  color: var(--white);
`;

const StyledSlider = styled(Slider)`
  margin-left: 12px;
  margin-right: 12px;
  .rc-slider-rail {
    background-color: #999999;
  }

  .rc-slider-track {
    background-color: var(--green);
  }
  .rc-slider-handle {
    width: 24px;
    height: 24px;
    margin-top: -12px;
    border-width: 3px;
    border-color: var(--black2);
    background-image: var(--greenGradient);
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: var(--greenGradient);
      filter: blur(18px);
    }
  }
  .rc-slider-dot,
  .rc-slider-mark {
    display: none;
  }
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SliderBorders = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.01em;
  color: var(--white);
`;

const StyledChart = styled(Chart)`
  margin-bottom: 40px;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfitBlock = styled.div`
  padding: 10px 20px;
  border: 1px solid #999999;
  border-radius: 10px;
`;

const ProfitBlockText = styled.p`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: 0.01em;

  color: var(--white);
  span {
    color: var(--green);
    margin-left: 24px;
  }
`;

const StyledButton = styled(Button)`
  font-size: 18px;
  line-height: 25px;
  padding-top: 11px;
  padding-bottom: 11px;
`;

export default Calculator;
