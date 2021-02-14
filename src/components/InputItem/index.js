import React, { useState, useEffect } from 'react';
import { useDispatch } from 'redux-react-hook';
import { Input, Form, Button, Col, Row, message } from 'antd';
import { getCaptcha } from '../../actions/register';
import styles from './index.module.less';

const InputItem = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { name, rules, ...rest } = props;
  const [timing, setTiming] = useState(false); // Count down or not?
  const [count, setCount] = useState(props.countDown || 45); // Count down
  const handleClickCaptcha = () => {
    message.success("Successfully get the V-code 12345!");
    dispatch(getCaptcha());
    setTiming(true);
  };

  useEffect(() => {
    let interval = 0;
    if (timing) {
      interval = window.setInterval(() => {
        setCount((preSecond) => {
          if (preSecond <= 1) {
            setTiming(false); // end of count down
            clearInterval(interval);
            return props.countDown || 45;
          }
          return preSecond - 1;
        })
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timing, props.countDown]);

  if (name === "captcha") {
    return (
      <Form.Item name={name} rules={rules}>
        <Row gutter={8}>
          <Col span={16}>
            <Input {...rest} />
          </Col>
          <Col span={8}>
            <Button
              className={styles.getCaptcha}
              disabled={timing}
              size="large"
              onClick={handleClickCaptcha}
            >
              {timing ? `${count}秒` : '获取验证码'}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    );
  }
  return (
    <Form.Item name={name} rules={rules}>
      <Input ref={ref} {...rest} />
    </Form.Item>
  );
});

export default InputItem;
