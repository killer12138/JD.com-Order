import React from 'react';
import { NavBar, Button, Cell, CellGroup, Tag } from '@nutui/nutui-react';
import { Del, Service, Comment, Phone, Cart, Star, List, ArrowLeft, ArrowRight } from '@nutui/icons-react';
import './JDOrder.css';

/**
 * 京东订单详情页面组件
 * 展示京东风格的订单完成页面
 *
 * @param {Object} props - 组件属性
 * @param {Object} props.orderData - 订单数据
 */
function JDOrder({ orderData }) {
  // 商品图片
  const productImage = orderData.jdProductImage || orderData.jdItems?.[0]?.image || orderData.productImage;

  const actionButtons = [
    { text: '删除订单', type: 'default' },
    { text: '退款售后', type: 'default' },
    { text: '平台客服', type: 'default' },
    { text: '联系商家', type: 'primary' },
    { text: '再次购买', type: 'primary' },
    { text: '评价商品', type: 'default' },
    { text: '查看发票', type: 'default' }
  ];

  const copyOrderNumber = () => {
    navigator.clipboard
      .writeText(orderData.orderNumber)
      .then(() => {
        alert('订单号已复制到剪贴板');
      })
      .catch(() => {
        alert('复制失败，请手动复制');
      });
  };

  return (
    <div className="jd-order">
      {/* 顶部导航 */}
      <NavBar
        title={orderData.jdStatus || orderData.status}
        leftShow={true}
        leftText={<ArrowLeft size="18" />}
        onClickLeft={() => console.log('返回')}
      />

      {/* 订单状态描述 */}
      <div className="status-section">
        <p className="status-desc">{orderData.jdStatusDesc || orderData.statusDesc}</p>
      </div>

      {/* 操作按钮网格 */}
      <div className="action-grid">
        {actionButtons.map((btn, index) => {
          const iconComponents = [
            <Del size="20" />,
            <Service size="20" />,
            <Comment size="20" />,
            <Phone size="20" />,
            <Cart size="20" />,
            <Star size="20" />,
            <List size="20" />
          ];
          return (
            <div key={index} className="action-item">
              <div className={`action-icon ${btn.type === 'primary' ? 'primary' : ''}`}>
                {iconComponents[index]}
              </div>
              <span className={`action-text ${btn.type === 'primary' ? 'primary' : ''}`}>{btn.text}</span>
            </div>
          );
        })}
      </div>

      {/* 商家信息 */}
      <div className="restaurant-section">
        <div className="restaurant-header">
          <Tag type="warning" background="#fbcc1f" color="#000">
            {orderData.jdRestaurant?.category || orderData.restaurant?.category || '外卖'}
          </Tag>
          <span className="restaurant-name">
            {orderData.jdRestaurant?.name || orderData.restaurant?.name || '日欣家常菜'}
          </span>
          <span className="arrow">›</span>
        </div>

        {/* 商品信息 */}
        <div className="item-info">
          <div className="item-image">{productImage && <img src={productImage} alt="商品" />}</div>
          <div className="item-details">
            <h4>{orderData.jdItems?.[0]?.name || orderData.items?.[0]?.name || '毛血旺'}</h4>
            <p className="item-specs">
              {orderData.jdItems?.[0]?.specs || orderData.items?.[0]?.specs || '数量 ×1， 2人份'}
            </p>
            <p className="item-note">
              {orderData.jdItems?.[0]?.note || orderData.items?.[0]?.note || '不支持7天无理由退货'}
            </p>
          </div>
          <div className="item-price">
            <span className="current-price">
              到手¥{orderData.jdItems?.[0]?.currentPrice || orderData.items?.[0]?.currentPrice || '33.2'}
            </span>
            <span className="original-price">
              ¥{orderData.jdItems?.[0]?.originalPrice || orderData.items?.[0]?.originalPrice || '65'}
            </span>
          </div>
        </div>

        <div className="order-summary">
          <Button size="small" type="default">
            评价商品
          </Button>
        </div>
      </div>

      {/* 订单详情 */}
      <CellGroup divider={false}>
        <Cell
          className="with-arrow"
          title="实付款"
          extra={
            <span>
              <span style={{ fontSize: '12px', color: '#ea251d', fontWeight: 'bold' }}>
                共减¥{orderData.discountAmount}
              </span>
              <span style={{ fontWeight: 'bold' }}>合计¥{orderData.payAmount}</span>
            </span>
          }
          onClick={() => {}}
        />
        <Cell
          title="订单编号"
          extra={
            <>
              {orderData.orderNumber}
              <ArrowRight />
            </>
          }
          onClick={copyOrderNumber}
        />
        <Cell
          className="with-arrow"
          title="交易凭证"
          extra="发生交易争议时，可作为判断依据"
          onClick={() => {}}
        />
        <Cell title="支付方式" extra={orderData.payMethod} />
        <Cell title="支付时间" extra={orderData.jdPayTime || orderData.payTime} />
        <Cell title="下单时间" extra={orderData.jdOrderTime || orderData.orderTime} />
      </CellGroup>

      <CellGroup divider={false}>
        <Cell title="送达时间" extra={orderData.jdDeliveryTime || orderData.deliveryTime} />
        <Cell title="收货信息" extra={orderData.jdRecipient || orderData.recipient} />
        <Cell title="收货地址" extra={orderData.jdAddress || orderData.address} />
      </CellGroup>
    </div>
  );
}

export default JDOrder;
