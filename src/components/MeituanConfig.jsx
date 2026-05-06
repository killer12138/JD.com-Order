import React, { useState, useRef } from 'react';
import { Input, TextArea, Button, Cell, CellGroup, Radio, RadioGroup, InputNumber } from '@nutui/nutui-react';
import { Photograph, Del } from '@nutui/icons-react';
import './MeituanConfig.css';

/**
 * 美团订单配置表单组件
 * 用于配置美团订单页面的信息
 *
 * @param {Object} props - 组件属性
 * @param {Object} props.orderData - 订单数据
 * @param {Function} props.onUpdate - 更新回调函数
 */
function MeituanConfig({ orderData, onUpdate }) {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    // 页面标题
    pageTitle: orderData.pageTitle || '订单已完成',

    // 订单状态信息
    status: orderData.status || '完成',
    statusDesc: orderData.statusDesc || '感谢您对美团外卖的信任，期待再次光临。',

    // 商家信息
    restaurantName: orderData.restaurant?.name || '日欣家常菜',
    restaurantCategory: orderData.restaurant?.category || '外卖',

    // 商品信息
    itemName: orderData.items?.[0]?.name || '毛血旺',
    itemSpecs: orderData.items?.[0]?.specs || '数量 ×1， 2人份',
    itemOriginalPrice: parseFloat(orderData.items?.[0]?.originalPrice || 65),
    itemCurrentPrice: parseFloat(orderData.items?.[0]?.currentPrice || 33.2),
    itemNote: orderData.items?.[0]?.note || '不支持7天无理由退货',
    itemImage: orderData.items?.[0]?.image || orderData.productImage || '',

    // 支付信息
    payMethod: orderData.payMethod || '微信支付',

    // 收货信息
    recipient: orderData.recipient || '鲁敏178****1750',
    address: orderData.address || '东山一路-78号楼（5单元502）',

    // 时间信息
    orderTime: orderData.orderTime || '2025-09-29 08:40:15',
    payTime: orderData.payTime || '2025-09-29 09:11:32',
    deliveryTime: orderData.deliveryTime || '2025-09-29 10:11:16'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // 处理图片上传
  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('请上传图片文件（jpg、png、gif、webp格式）');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      setFormData(prev => ({ ...prev, itemImage: e.target.result }));
    };
    reader.onerror = () => alert('图片读取失败，请重试');
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, itemImage: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    const totalAmount = formData.itemOriginalPrice;
    const discountAmount = totalAmount - formData.itemCurrentPrice;
    const payAmount = formData.itemCurrentPrice;

    const updatedData = {
      ...orderData,
      pageTitle: formData.pageTitle,
      status: formData.status,
      statusDesc: formData.statusDesc,
      totalAmount: totalAmount.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      payAmount: payAmount.toFixed(2),
      payMethod: formData.payMethod,
      orderTime: formData.orderTime,
      payTime: formData.payTime,
      deliveryTime: formData.deliveryTime,
      recipient: formData.recipient,
      address: formData.address,
      productImage: formData.itemImage,
      restaurant: {
        name: formData.restaurantName,
        category: formData.restaurantCategory
      },
      items: [
        {
          name: formData.itemName,
          specs: formData.itemSpecs,
          originalPrice: formData.itemOriginalPrice.toFixed(2),
          currentPrice: formData.itemCurrentPrice.toFixed(2),
          note: formData.itemNote,
          image: formData.itemImage
        }
      ]
    };

    onUpdate(updatedData);
    alert('美团订单配置已更新！');
  };

  const handleReset = () => {
    setFormData({
      pageTitle: orderData.pageTitle || '订单已完成',
      status: orderData.status || '完成',
      statusDesc: orderData.statusDesc || '感谢您对美团外卖的信任，期待再次光临。',
      restaurantName: orderData.restaurant?.name || '日欣家常菜',
      restaurantCategory: orderData.restaurant?.category || '外卖',
      itemName: orderData.items?.[0]?.name || '毛血旺',
      itemSpecs: orderData.items?.[0]?.specs || '数量 ×1， 2人份',
      itemOriginalPrice: parseFloat(orderData.items?.[0]?.originalPrice || 65),
      itemCurrentPrice: parseFloat(orderData.items?.[0]?.currentPrice || 33.2),
      itemNote: orderData.items?.[0]?.note || '不支持7天无理由退货',
      itemImage: orderData.items?.[0]?.image || orderData.productImage || '',
      payMethod: orderData.payMethod || '微信支付',
      recipient: orderData.recipient || '鲁敏178****1750',
      address: orderData.address || '东山一路-78号楼（5单元502）',
      orderTime: orderData.orderTime || '2025-09-29 08:40:15',
      payTime: orderData.payTime || '2025-09-29 09:11:32',
      deliveryTime: orderData.deliveryTime || '2025-09-29 10:11:16'
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
    alert('已重置为原始数据');
  };

  return (
    <div className="meituan-config">
      <div className="config-header">
        <h2>🍔 美团订单配置</h2>
        <p className="config-desc">配置美团订单页面信息 · 支持图片上传</p>
      </div>

      <div className="config-content">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />

        {/* 页面标题 */}
        <div className="config-section">
          <h3>📝 页面标题</h3>
          <CellGroup>
            <Cell title="主标题">
              <Input
                value={formData.pageTitle}
                onChange={val => handleChange('pageTitle', val)}
                placeholder="订单已完成"
              />
            </Cell>
          </CellGroup>
        </div>

        {/* 订单状态 */}
        <div className="config-section">
          <h3>📦 订单状态</h3>
          <CellGroup>
            <Cell title="状态">
              <Input
                value={formData.status}
                onChange={val => handleChange('status', val)}
                placeholder="请输入订单状态"
              />
            </Cell>
            <Cell title="状态描述">
              <TextArea
                value={formData.statusDesc}
                onChange={val => handleChange('statusDesc', val)}
                placeholder="请输入状态描述"
                rows={2}
              />
            </Cell>
          </CellGroup>
        </div>

        {/* 商家信息 */}
        <div className="config-section">
          <h3>🏪 商家信息</h3>
          <CellGroup>
            <Cell title="商家名称">
              <Input
                value={formData.restaurantName}
                onChange={val => handleChange('restaurantName', val)}
                placeholder="请输入商家名称"
              />
            </Cell>
            <Cell title="商家类型">
              <Input
                value={formData.restaurantCategory}
                onChange={val => handleChange('restaurantCategory', val)}
                placeholder="请输入商家类型"
              />
            </Cell>
          </CellGroup>
        </div>

        {/* 商品信息 */}
        <div className="config-section">
          <h3>🍜 商品信息</h3>
          <CellGroup>
            <Cell title="商品图片">
              <div className="image-upload-wrapper">
                {formData.itemImage ? (
                  <div className="image-preview-container">
                    <img src={formData.itemImage} alt="商品图片" className="image-preview" />
                    <div className="image-actions">
                      <Button
                        size="small"
                        type="default"
                        icon={<Photograph size="14" />}
                        onClick={triggerFileInput}
                      >
                        更换
                      </Button>
                      <Button
                        size="small"
                        type="default"
                        icon={<Del size="14" />}
                        onClick={handleRemoveImage}
                      >
                        删除
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="image-upload-box" onClick={triggerFileInput}>
                    <Photograph size="32" color="#ccc" />
                    <p className="upload-text">点击上传商品图片</p>
                    <p className="upload-hint">支持 jpg、png、gif、webp 格式，最大5MB</p>
                  </div>
                )}
              </div>
            </Cell>
            <Cell title="商品名称">
              <Input
                value={formData.itemName}
                onChange={val => handleChange('itemName', val)}
                placeholder="请输入商品名称"
              />
            </Cell>
            <Cell title="商品规格">
              <TextArea
                value={formData.itemSpecs}
                onChange={val => handleChange('itemSpecs', val)}
                placeholder="请输入商品规格"
                rows={2}
              />
            </Cell>
            <Cell title="原价">
              <InputNumber
                value={formData.itemOriginalPrice}
                onChange={val => handleChange('itemOriginalPrice', val)}
                min={0}
                step={0.1}
              />
            </Cell>
            <Cell title="现价">
              <InputNumber
                value={formData.itemCurrentPrice}
                onChange={val => handleChange('itemCurrentPrice', val)}
                min={0}
                step={0.1}
              />
            </Cell>
            <Cell title="商品备注">
              <Input
                value={formData.itemNote}
                onChange={val => handleChange('itemNote', val)}
                placeholder="请输入商品备注"
              />
            </Cell>
          </CellGroup>
        </div>

        {/* 支付信息 */}
        <div className="config-section">
          <h3>💳 支付信息</h3>
          <CellGroup>
            <Cell title="支付方式">
              <RadioGroup value={formData.payMethod} onChange={val => handleChange('payMethod', val)}>
                <Radio value="微信支付">微信支付</Radio>
                <Radio value="支付宝">支付宝</Radio>
                <Radio value="银行卡">银行卡</Radio>
              </RadioGroup>
            </Cell>
          </CellGroup>
        </div>

        {/* 收货信息 */}
        <div className="config-section">
          <h3>📍 收货信息</h3>
          <CellGroup>
            <Cell title="收货人">
              <Input
                value={formData.recipient}
                onChange={val => handleChange('recipient', val)}
                placeholder="请输入收货人"
              />
            </Cell>
            <Cell title="收货地址">
              <TextArea
                value={formData.address}
                onChange={val => handleChange('address', val)}
                placeholder="请输入收货地址"
                rows={2}
              />
            </Cell>
          </CellGroup>
        </div>

        {/* 时间信息 */}
        <div className="config-section">
          <h3>⏰ 时间信息</h3>
          <CellGroup>
            <Cell title="下单时间">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '100px' }}>下单时间</div>
                <input
                  type="datetime-local"
                  className="datetime-input"
                  value={formData.orderTime.replace(' ', 'T').substring(0, 16)}
                  onChange={e => {
                    const dateValue = e.target.value.replace('T', ' ') + ':00';
                    handleChange('orderTime', dateValue);
                  }}
                />
              </div>
            </Cell>
            <Cell title="支付时间">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '100px' }}>支付时间</div>
                <input
                  type="datetime-local"
                  className="datetime-input"
                  value={formData.payTime.replace(' ', 'T').substring(0, 16)}
                  onChange={e => {
                    const dateValue = e.target.value.replace('T', ' ') + ':00';
                    handleChange('payTime', dateValue);
                  }}
                />
              </div>
            </Cell>
            <Cell title="送达时间">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '100px' }}>送达时间</div>
                <input
                  type="datetime-local"
                  className="datetime-input"
                  value={formData.deliveryTime.replace(' ', 'T').substring(0, 16)}
                  onChange={e => {
                    const dateValue = e.target.value.replace('T', ' ') + ':00';
                    handleChange('deliveryTime', dateValue);
                  }}
                />
              </div>
            </Cell>
          </CellGroup>
        </div>

        {/* 操作按钮 */}
        <div className="config-actions">
          <Button type="default" onClick={handleReset} block style={{ borderRadius: '24px' }}>
            🔄 重置数据
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            block
            style={{
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
              border: 'none'
            }}
          >
            ✅ 保存更新
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MeituanConfig;
