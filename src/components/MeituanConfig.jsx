import React, { useState, useRef } from 'react';
import { Input, TextArea, Button } from '@nutui/nutui-react';
import { Photograph, Del } from '@nutui/icons-react';
import './MeituanConfig.css';

function MeituanConfig({ orderData, onUpdate }) {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    pageTitle: orderData.pageTitle || '尊敬的白金会员，订单已完成',
    statusDesc: orderData.statusDesc || '感谢您对美团外卖的信任，期待再次光临。',
    restaurantName: orderData.restaurant?.name || '肆两禾面馆',
    payMethod: orderData.payMethod || '美团支付',
    payAmount: orderData.payAmount || '20.5',
    recipient: orderData.recipient || '李**(先生) 176****1867',
    address: orderData.address || '利群智信中心L座',
    riderName: orderData.riderName || '王浩然',
    orderNumber: orderData.orderNumber || '2702 0632 5257 2748 860',
    orderTime: orderData.orderTime || '2026-04-27 19:34:09',
    itemImage: orderData.items?.[0]?.image || orderData.productImage || '',
    itemCount: orderData.items?.length || 5,
  });

  const set = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('图片不能超过5MB'); return; }
    const reader = new FileReader();
    reader.onload = ev => set('itemImage', ev.target.result);
    reader.readAsDataURL(file);
  };

  // 将 datetime-local 值转为显示格式
  const toDisplay = dtLocal => dtLocal ? dtLocal.replace('T', ' ') + ':00' : '';
  const toInput = dtStr => dtStr ? dtStr.replace(' ', 'T').substring(0, 16) : '';

  const handleSubmit = () => {
    onUpdate({
      ...orderData,
      pageTitle: formData.pageTitle,
      statusDesc: formData.statusDesc,
      payMethod: formData.payMethod,
      payAmount: formData.payAmount,
      totalAmount: formData.payAmount,
      orderTime: formData.orderTime,
      recipient: formData.recipient,
      address: formData.address,
      riderName: formData.riderName,
      orderNumber: formData.orderNumber,
      productImage: formData.itemImage,
      restaurant: { name: formData.restaurantName, category: '外卖' },
      items: Array.from({ length: Number(formData.itemCount) || 1 }, (_, i) => ({
        name: `商品${i + 1}`,
        image: formData.itemImage,
        originalPrice: formData.payAmount,
        currentPrice: formData.payAmount,
      })),
    });
  };

  return (
    <div className="mt-config">
      <div className="mt-config-header">
        <h2>美团订单配置</h2>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{display:'none'}}/>

      <div className="mt-config-body">

        <div className="cfg-section">
          <div className="cfg-label">标题</div>
          <Input value={formData.pageTitle} onChange={v => set('pageTitle', v)} placeholder="订单标题"/>
        </div>

        <div className="cfg-section">
          <div className="cfg-label">副标题</div>
          <TextArea value={formData.statusDesc} onChange={v => set('statusDesc', v)} rows={2}/>
        </div>

        <div className="cfg-row">
          <div className="cfg-section cfg-half">
            <div className="cfg-label">商家名称</div>
            <Input value={formData.restaurantName} onChange={v => set('restaurantName', v)}/>
          </div>
          <div className="cfg-section cfg-half">
            <div className="cfg-label">骑手姓名</div>
            <Input value={formData.riderName} onChange={v => set('riderName', v)}/>
          </div>
        </div>

        <div className="cfg-section">
          <div className="cfg-label">收货人</div>
          <Input value={formData.recipient} onChange={v => set('recipient', v)}/>
        </div>

        <div className="cfg-section">
          <div className="cfg-label">收货地址</div>
          <Input value={formData.address} onChange={v => set('address', v)}/>
        </div>

        <div className="cfg-row">
          <div className="cfg-section cfg-half">
            <div className="cfg-label">支付方式</div>
            <Input value={formData.payMethod} onChange={v => set('payMethod', v)}/>
          </div>
          <div className="cfg-section cfg-half">
            <div className="cfg-label">实付金额</div>
            <Input value={formData.payAmount} onChange={v => set('payAmount', v)} type="number"/>
          </div>
        </div>

        <div className="cfg-row">
          <div className="cfg-section cfg-half">
            <div className="cfg-label">订单号</div>
            <Input value={formData.orderNumber} onChange={v => set('orderNumber', v)}/>
          </div>
          <div className="cfg-section cfg-half">
            <div className="cfg-label">商品件数</div>
            <Input value={formData.itemCount} onChange={v => set('itemCount', v)} type="number"/>
          </div>
        </div>

        <div className="cfg-section">
          <div className="cfg-label">下单时间</div>
          <input
            type="datetime-local"
            className="cfg-datetime"
            value={toInput(formData.orderTime)}
            onChange={e => set('orderTime', toDisplay(e.target.value))}
          />
        </div>

        <div className="cfg-section">
          <div className="cfg-label">商品图片</div>
          {formData.itemImage ? (
            <div className="cfg-img-preview">
              <img src={formData.itemImage} alt="商品"/>
              <div className="cfg-img-actions">
                <button onClick={() => fileInputRef.current?.click()}>更换</button>
                <button onClick={() => { set('itemImage', ''); fileInputRef.current && (fileInputRef.current.value=''); }}>删除</button>
              </div>
            </div>
          ) : (
            <div className="cfg-upload-box" onClick={() => fileInputRef.current?.click()}>
              <Photograph size="28" color="#ccc"/>
              <span>点击上传商品图片</span>
            </div>
          )}
        </div>

        <div className="cfg-actions">
          <Button type="primary" block onClick={handleSubmit}
            style={{background:'linear-gradient(135deg,#ff6b35,#f7931e)',border:'none',borderRadius:'24px'}}>
            保存并预览
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MeituanConfig;
