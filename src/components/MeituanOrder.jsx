import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import './MeituanOrder.css';
import shangpinImg from '../assets/shangpin.png';

function MeituanOrder({ orderData }) {
  const pageRef = useRef(null);
  const productImage = orderData.productImage || orderData.items?.[0]?.image || shangpinImg;

  const handleExport = async () => {
    if (!pageRef.current) return;
    const el = pageRef.current;
    const canvas = await html2canvas(el, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      width: el.scrollWidth,
      height: el.scrollHeight,
      windowWidth: el.scrollWidth,
      scrollY: -window.scrollY,
      scrollX: 0,
    });
    const link = document.createElement('a');
    link.download = `meituan-order-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="mt-wrapper">
      <div className="mt-export-bar">
        <button className="mt-export-btn" onClick={handleExport}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          导出截图
        </button>
      </div>

      <div className="mt-page" ref={pageRef}>
        {/* 状态栏 */}
        <div className="mt-statusbar">
          <span className="mt-statusbar-time">10:35</span>
          <div className="mt-statusbar-icons">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><rect x="2" y="8" width="3" height="13" rx="1"/><rect x="7" y="5" width="3" height="16" rx="1"/><rect x="12" y="2" width="3" height="19" rx="1"/><rect x="17" y="0" width="3" height="21" rx="1" opacity="0.3"/></svg>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M1.5 8.5C5.5 4.5 10.5 2.5 12 2.5s6.5 2 10.5 6"/><path d="M5 12c1.9-1.9 4.3-3 7-3s5.1 1.1 7 3"/><path d="M8.5 15.5c.9-.9 2.2-1.5 3.5-1.5s2.6.6 3.5 1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
            <span style={{fontSize:'12px',fontWeight:600}}>84</span>
          </div>
        </div>

        {/* 顶部导航栏 */}
        <div className="mt-navbar">
          <div className="navbar-left">
            <svg className="icon-back" viewBox="0 0 1024 1024" width="22" height="22">
              <path d="M671.968 912c-12.288 0-24.576-4.672-33.952-14.048L286.048 545.984c-18.752-18.72-18.752-49.12 0-67.872l351.968-352c18.752-18.752 49.12-18.752 67.872 0 18.752 18.72 18.752 49.12 0 67.872l-318.016 318.048 318.016 318.016c18.752 18.752 18.752 49.12 0 67.872C696.544 907.328 684.256 912 671.968 912z" fill="#333333"/>
            </svg>
          </div>
          <div className="navbar-right">
            <svg className="icon-share" viewBox="0 0 1024 1024" width="22" height="22">
              <path d="M864 608v256H160V608H96v320h832V608z" fill="#333333"/>
              <path d="M480 96v544h64V96z" fill="#333333"/>
              <path d="M512 96L320 288l45.248 45.248L512 186.496l146.752 146.752L704 288z" fill="#333333"/>
            </svg>
            <svg className="icon-refresh" viewBox="0 0 1024 1024" width="22" height="22">
              <path d="M925.696 515.072c0-229.376-186.368-414.72-414.72-414.72-164.864 0-307.2 96.256-374.272 235.52L64 289.28V512h222.72l-88.576-88.576C257.536 303.104 373.76 218.112 512 218.112c163.84 0 296.96 133.12 296.96 296.96 0 163.84-133.12 296.96-296.96 296.96-89.088 0-168.96-39.424-223.232-101.376l-82.944 82.944C284.672 884.48 392.192 928.768 512 928.768c229.376 0 413.696-185.344 413.696-413.696z" fill="#333333"/>
            </svg>
          </div>
        </div>

        {/* 订单完成状态 */}
        <div className="mt-status-section">
          <h1 className="mt-status-title">{orderData.pageTitle || '尊敬的白金会员，订单已完成'}</h1>
          <p className="mt-status-subtitle">{orderData.statusDesc || '感谢您对美团外卖的信任，期待再次光临。'}</p>
          <div className="mt-zhunshi-bar">
            <span className="zhunshi-icon">🛡</span>
            <span className="zhunshi-label">准时宝：</span>
            <span className="zhunshi-text">保障已结束</span>
            <span className="zhunshi-arrow">›</span>
          </div>
        </div>

        {/* 快捷操作按钮 */}
        <div className="mt-actions-section">
          <div className="mt-action-item"><span className="action-text-only">更多</span></div>
          <div className="mt-action-btn"><span className="action-btn-text">打赏骑手</span></div>
          <div className="mt-action-btn"><span className="action-btn-text">联系商家</span></div>
          <div className="mt-action-btn mt-action-highlight"><span className="action-btn-text action-text-orange">再来一单</span></div>
        </div>

        {/* 订单信息卡片 */}
        <div className="mt-card" style={{marginTop:'8px'}}>
          <div className="mt-card-title">订单信息</div>

          <div className="mt-info-row">
            <span className="info-label">期望时间</span>
            <span className="info-value-text">立即配送</span>
          </div>

          <div className="mt-info-row">
            <span className="info-label">配送地址</span>
            <div className="info-value">
              <div className="address-main">{orderData.address || '利群智信中心L座'}</div>
              <div className="address-sub">{orderData.recipient || '李**(先生) 176****1867'}</div>
            </div>
          </div>

          <div className="mt-info-row">
            <span className="info-label">餐具数量</span>
            <span className="info-value-text">商家按餐量提供</span>
          </div>

          <div className="mt-info-row mt-info-invoice">
            <span className="info-label">发票信息</span>
            <div className="info-value-inline">
              <span className="info-text-gray">您暂未添加发票信息</span>
              <button className="invoice-btn">申请开票</button>
            </div>
          </div>

          <div className="mt-info-row">
            <span className="info-label">配送服务</span>
            <span className="info-value-text info-link">美团专送 ›</span>
          </div>

          <div className="mt-info-row">
            <span className="info-label">配送骑手</span>
            <div className="info-value-inline">
              <span className="info-value-text">{orderData.riderName || '王浩然'}</span>
              <button className="invoice-btn">打赏/查看骑手</button>
            </div>
          </div>

          <div className="mt-info-row">
            <span className="info-label">号码保护</span>
            <span className="info-value-text info-link">保护隐私，服务护航 ›</span>
          </div>

          <div className="mt-info-row">
            <span className="info-label">订单号码</span>
            <div className="info-value-inline">
              <span className="info-value-text">{orderData.orderNumber || '2702 0632 5257 2748 860'}</span>
              <button className="invoice-btn">复制</button>
            </div>
          </div>

          <div className="mt-info-row">
            <span className="info-label">下单时间</span>
            <span className="info-value-text">{orderData.orderTime || '2026-04-27 19:34:09'}</span>
          </div>

          <div className="mt-info-row">
            <span className="info-label">支付方式</span>
            <span className="info-value-text">
              {orderData.payMethod || '美团支付'}（实付¥{orderData.payAmount || '20.5'}）
            </span>
          </div>

          <div className="mt-expand-row">
            <span className="expand-text">点击收起</span>
            <svg className="expand-arrow expand-arrow-up" viewBox="0 0 1024 1024" width="14" height="14">
              <path d="M512 309.333c8.533 0 17.067 2.134 23.467 8.534l341.333 341.333c12.8 12.8 12.8 32 0 44.8s-32 12.8-44.8 0L512 384l-320 320c-12.8 12.8-32 12.8-44.8 0s-12.8-32 0-44.8l341.333-341.333c6.4-6.4 14.934-8.534 23.467-8.534z" fill="#999999"/>
            </svg>
          </div>
        </div>

        {/* 商品费用卡片 */}
        <div className="mt-card">
          <div className="mt-card-header">
            <div className="mt-card-title" style={{marginBottom:0}}>商品费用</div>
          </div>

          <div className="mt-merchant-row">
            <span className="merchant-name">{orderData.restaurant?.name || '肆两禾面馆'}</span>
            <svg className="merchant-arrow" viewBox="0 0 1024 1024" width="14" height="14">
              <path d="M384 288l320 224-320 224z" fill="#999999"/>
            </svg>
            <div className="collect-badge">已收藏</div>
          </div>

          <div className="mt-products-row">
            <div className="product-images">
              <div className="product-img-item">
                <img src={orderData.items?.[0]?.image || productImage} alt="商品1"/>
              </div>
              <div className="product-img-item">
                <img src={orderData.items?.[1]?.image || productImage} alt="商品2"/>
              </div>
              <div className="products-count-badge">共{orderData.items?.length || 5}件</div>
            </div>
            <div className="products-total">
              <span className="total-label">合计</span>
              <span className="total-symbol">¥</span>
              <span className="total-amount">{orderData.payAmount || '20.5'}</span>
            </div>
          </div>

          <div className="mt-expand-row">
            <span className="expand-text">费用明细</span>
            <svg className="expand-arrow" viewBox="0 0 1024 1024" width="14" height="14">
              <path d="M512 714.667c-8.533 0-17.067-2.134-23.467-8.534L147.2 364.8c-12.8-12.8-12.8-32 0-44.8s32-12.8 44.8 0l320 314.667 320-314.667c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8L535.467 706.133c-6.4 6.4-14.934 8.534-23.467 8.534z" fill="#999999"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeituanOrder;
