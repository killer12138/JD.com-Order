import React, { useState, useRef } from 'react';
import { Input, TextArea, Button, Cell, CellGroup, Radio, RadioGroup, InputNumber } from '@nutui/nutui-react';
import { Photograph, Del } from '@nutui/icons-react';
import './JDConfig.css';

/**
 * 京东订单配置表单组件
 * 用于配置京东订单页面的信息
 *
 * @param {Object} props - 组件属性
 * @param {Object} props.orderData - 订单数据
 * @param {Function} props.onUpdate - 更新回调函数
 */
function JDConfig({ orderData, onUpdate }) {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    // 页面标题
    jdPageTitle: orderData.jdPageTitle || '完成',

    // 订单状态信息
    jdStatus: orderData.jdStatus || '完成',
    jdStatusDesc: orderData.jdStatusDesc || '订单已送达，请尽行节约，拒绝浪费，期待能再次光临',

    // 商家信息
    jdRestaurantName: orderData.jdRestaurant?.name || '日欣家常菜',
    jdRestaurantCategory: orderData.jdRestaurant?.category || '外卖',

    // 商品信息
    jdItemName: orderData.jdItems?.[0]?.name || '毛血旺',
    jdItemSpecs: orderData.jdItems?.[0]?.specs || '数量 ×1， 2人份',
    jdItemOriginalPrice: parseFloat(orderData.jdItems?.[0]?.originalPrice || 65),
    jdItemCurrentPrice: parseFloat(orderData.jdItems?.[0]?.currentPrice || 33.2),
    jdItemNote: orderData.jdItems?.[0]?.note || '不支持7天无理由退货',
    jdItemImage: orderData.jdItems?.[0]?.image || orderData.jdProductImage || '',

    // 收货信息
    jdRecipient: orderData.jdRecipient || '鲁敏178****1750',
    jdAddress: orderData.jdAddress || '山东青岛市崂山区中韩街道株洲路78号L座1202',

    // 时间信息（京东独立）
    jdOrderTime: orderData.jdOrderTime || '2025-09-29 08:40:15',
    jdPayTime: orderData.jdPayTime || '2025-09-29 09:11:32',
    jdDeliveryTime: orderData.jdDeliveryTime || '2025-09-29 10:11:16'
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
      setFormData(prev => ({ ...prev, jdItemImage: e.target.result }));
    };
    reader.onerror = () => alert('图片读取失败，请重试');
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, jdItemImage: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    const totalAmount = formData.jdItemOriginalPrice;
    const discountAmount = totalAmount - formData.jdItemCurrentPrice;
    const payAmount = formData.jdItemCurrentPrice;

    const updatedData = {
      ...orderData,
      jdPageTitle: formData.jdPageTitle,
      jdStatus: formData.jdStatus,
      jdStatusDesc: formData.jdStatusDesc,
      jdProductImage: formData.jdItemImage,
      jdRecipient: formData.jdRecipient,
      jdAddress: formData.jdAddress,
      jdOrderTime: formData.jdOrderTime,
      jdPayTime: formData.jdPayTime,
      jdDeliveryTime: formData.jdDeliveryTime,
      jdRestaurant: {
        name: formData.jdRestaurantName,
        category: formData.jdRestaurantCategory
      },
      jdItems: [
        {
          name: formData.jdItemName,
          specs: formData.jdItemSpecs,
          originalPrice: formData.jdItemOriginalPrice.toFixed(2),
          currentPrice: formData.jdItemCurrentPrice.toFixed(2),
          note: formData.jdItemNote,
          image: formData.jdItemImage
        }
      ]
    };

    onUpdate(updatedData);
    alert('京东订单配置已更新！');
  };

  const handleReset = () => {
    setFormData({
      jdPageTitle: orderData.jdPageTitle || '完成',
      jdStatus: orderData.jdStatus || '完成',
      jdStatusDesc: orderData.jdStatusDesc || '订单已送达，请尽行节约，拒绝浪费，期待能再次光临',
      jdRestaurantName: orderData.jdRestaurant?.name || '日欣家常菜',
      jdRestaurantCategory: orderData.jdRestaurant?.category || '外卖',
      jdItemName: orderData.jdItems?.[0]?.name || '毛血旺',
      jdItemSpecs: orderData.jdItems?.[0]?.specs || '数量 ×1， 2人份',
      jdItemOriginalPrice: parseFloat(orderData.jdItems?.[0]?.originalPrice || 65),
      jdItemCurrentPrice: parseFloat(orderData.jdItems?.[0]?.currentPrice || 33.2),
      jdItemNote: orderData.jdItems?.[0]?.note || '不支持7天无理由退货',
      jdItemImage: orderData.jdItems?.[0]?.image || orderData.jdProductImage || '',
      jdRecipient: orderData.jdRecipient || '鲁敏178****1750',
      jdAddress: orderData.jdAddress || '山东青岛市崂山区中韩街道株洲路78号L座1202',
      jdOrderTime: orderData.jdOrderTime || '2025-09-29 08:40:15',
      jdPayTime: orderData.jdPayTime || '2025-09-29 09:11:32',
      jdDeliveryTime: orderData.jdDeliveryTime || '2025-09-29 10:11:16'
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
    alert('已重置为原始数据');
  };

  return (
    <div className="jd-config">
      <div className="config-header">
        <h2>🛒 京东订单配置</h2>
        <p className="config-desc">配置京东订单页面信息 · 支持图片上传</p>
      </div>

      <div className="config-content">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />

        {/* 订单状态 */}
        <div className="config-section">
          <h3>📦 订单状态</h3>
          <CellGroup>
            <Cell title="状态">
              <Input
                value={formData.jdStatus}
                onChange={val => handleChange('jdStatus', val)}
                placeholder="请输入订单状态"
              />
            </Cell>
            <Cell title="状态描述">
              <TextArea
                value={formData.jdStatusDesc}
                onChange={val => handleChange('jdStatusDesc', val)}
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
                value={formData.jdRestaurantName}
                onChange={val => handleChange('jdRestaurantName', val)}
                placeholder="请输入商家名称"
              />
            </Cell>
            <Cell title="商家类型">
              <Input
                value={formData.jdRestaurantCategory}
                onChange={val => handleChange('jdRestaurantCategory', val)}
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
                {formData.jdItemImage ? (
                  <div className="image-preview-container">
                    <img src={formData.jdItemImage} alt="商品图片" className="image-preview" />
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
                value={formData.jdItemName}
                onChange={val => handleChange('jdItemName', val)}
                placeholder="请输入商品名称"
              />
            </Cell>
            <Cell title="商品规格">
              <TextArea
                value={formData.jdItemSpecs}
                onChange={val => handleChange('jdItemSpecs', val)}
                placeholder="请输入商品规格"
                rows={2}
              />
            </Cell>
            <Cell title="原价">
              <InputNumber
                value={formData.jdItemOriginalPrice}
                onChange={val => handleChange('jdItemOriginalPrice', val)}
                min={0}
                step={0.1}
              />
            </Cell>
            <Cell title="现价">
              <InputNumber
                value={formData.jdItemCurrentPrice}
                onChange={val => handleChange('jdItemCurrentPrice', val)}
                min={0}
                step={0.1}
              />
            </Cell>
            <Cell title="商品备注">
              <Input
                value={formData.jdItemNote}
                onChange={val => handleChange('jdItemNote', val)}
                placeholder="请输入商品备注"
              />
            </Cell>
          </CellGroup>
        </div>

        {/* 收货信息 */}
        <div className="config-section">
          <h3>📍 收货信息</h3>
          <CellGroup>
            <Cell title="收货人">
              <Input
                value={formData.jdRecipient}
                onChange={val => handleChange('jdRecipient', val)}
                placeholder="请输入收货人"
              />
            </Cell>
            <Cell title="收货地址">
              <TextArea
                value={formData.jdAddress}
                onChange={val => handleChange('jdAddress', val)}
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
                  value={formData.jdOrderTime.replace(' ', 'T').substring(0, 16)}
                  onChange={e => {
                    const dateValue = e.target.value.replace('T', ' ') + ':00';
                    handleChange('jdOrderTime', dateValue);
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
                  value={formData.jdPayTime.replace(' ', 'T').substring(0, 16)}
                  onChange={e => {
                    const dateValue = e.target.value.replace('T', ' ') + ':00';
                    handleChange('jdPayTime', dateValue);
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
                  value={formData.jdDeliveryTime.replace(' ', 'T').substring(0, 16)}
                  onChange={e => {
                    const dateValue = e.target.value.replace('T', ' ') + ':00';
                    handleChange('jdDeliveryTime', dateValue);
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
            style={{ borderRadius: '24px', background: '#E4393C', border: 'none' }}
          >
            ✅ 保存更新
          </Button>
        </div>
      </div>
    </div>
  );
}

export default JDConfig;
