import React, { useState } from 'react';
import { Tabs, TabPane } from '@nutui/nutui-react';

import '@nutui/nutui-react/dist/style.css';
import './App.css';
import JDOrder from './components/JDOrder';
import JDConfig from './components/JDConfig';
import MeituanOrder from './components/MeituanOrder';
import MeituanConfig from './components/MeituanConfig';

function App() {
  const [activeTab, setActiveTab] = useState('0');

  // 商品数据
  const itemData1 = {
    name: '招牌香酥鸡柳＋年糕＋薯..',
    specs: '数量 ×1， 1人份，微辣，少糖',
    originalPrice: 45.8,
    currentPrice: 32.15,
    note: '不支持7天无理由退货'
  };
  const itemData = {
    name: '毛血旺',
    specs: '数量 ×1',
    originalPrice: 15,
    currentPrice: 11,
    note: '不支持7天无理由退货'
  };
  const itemData2 = {
    name: '酸辣粉',
    specs: '数量 ×1',
    originalPrice: 15,
    currentPrice: 11,
    note: '不支持7天无理由退货'
  };
  // 获取当前时间，格式化为 YYYY-MM-DD HH:mm:ss
  const getCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // 美团订单数据（2件商品）
  const meituanTotal = itemData.originalPrice + itemData2.originalPrice;
  const meituanDiscount = meituanTotal - (itemData.currentPrice + itemData2.currentPrice);
  const meituanPay = itemData.currentPrice + itemData2.currentPrice;

  const [orderData, setOrderData] = useState({
    status: '完成',
    statusDesc: '订单已送达，请尽行节约，拒绝浪费，期待能再次光临',
    orderNumber: Math.floor(Math.random() * 900000000000) + 100000000000 + '',
    totalAmount: meituanTotal.toFixed(2),
    discountAmount: meituanDiscount.toFixed(2),
    payAmount: meituanPay.toFixed(2),
    payMethod: '微信支付',
    // 美团时间（独立）
    orderTime: getCurrentTime(),
    payTime: getCurrentTime(),
    deliveryTime: getCurrentTime(),
    // 京东时间（独立）
    jdOrderTime: getCurrentTime(),
    jdPayTime: getCurrentTime(),
    jdDeliveryTime: getCurrentTime(),
    recipient: '李**(先生) 176****1867',
    address: '东山一路-78号楼（5单元502）',
    restaurant: {
      name: '韩两木面馆',
      category: '外卖'
    },
    items: [
      {
        name: itemData.name,
        specs: itemData.specs,
        originalPrice: itemData.originalPrice.toFixed(2),
        currentPrice: itemData.currentPrice.toFixed(2),
        note: itemData.note
      },
      {
        name: itemData2.name,
        specs: itemData2.specs,
        originalPrice: itemData2.originalPrice.toFixed(2),
        currentPrice: itemData2.currentPrice.toFixed(2),
        note: itemData2.note
      }
    ]
  });

  const handleUpdateOrder = newData => {
    setOrderData(newData);
    if (activeTab === '1') {
      setActiveTab('0');
    } else if (activeTab === '3') {
      setActiveTab('2');
    }
  };

  return (
    <div className="app-container">
      <Tabs value={activeTab} onChange={value => setActiveTab(value)}>
        <TabPane title="🛒 京东订单" value="0">
          <JDOrder orderData={orderData} />
        </TabPane>
        <TabPane title="⚙️ 京东配置" value="1">
          <JDConfig orderData={orderData} onUpdate={handleUpdateOrder} />
        </TabPane>
        <TabPane title="🍔 美团订单" value="2">
          <MeituanOrder orderData={orderData} />
        </TabPane>
        <TabPane title="⚙️ 美团配置" value="3">
          <MeituanConfig orderData={orderData} onUpdate={handleUpdateOrder} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
