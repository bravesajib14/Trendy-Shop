const WHATSAPP_NUMBER = "8801741532414";
const products = [
{id:1,name:"Amave Brand Article-Unstitched Replica",category:"Clothing",price:5520,oldPrice:6000,discount:8,desc:"A comfortable with an easy flattering fit.",image:"https://via.placeholder.com/640x640/F5E3D8/553A2C?text=Unstitched+Replica",flash:true,new:true},
{id:2,name:"Everyday Casual T-Shirt",category:"Clothing",price:450,oldPrice:600,discount:25,desc:"Soft-touch casual tee for relaxed everyday styling.",image:"https://via.placeholder.com/640x640/E6EAF0/39465A?text=Casual+T-Shirt",flash:true,new:false},
{id:3,name:"Women's Elegant Handbag",category:"Clothing",price:1290,oldPrice:1690,discount:24,desc:"A versatile handbag designed to complement daily outfits.",image:"https://via.placeholder.com/640x640/EADFD6/614B3E?text=Elegant+Handbag",flash:false,new:true},
{id:4,name:"Comfort Fit Sneakers",category:"Clothing",price:1550,oldPrice:1990,discount:22,desc:"Everyday sneakers with a clean look and comfortable feel.",image:"https://via.placeholder.com/640x640/E9ECEF/3B4650?text=Comfort+Sneakers",flash:true,new:true},
{id:5,name:"Hydrating Face Moisturizer",category:"Cosmetics",price:620,oldPrice:780,discount:21,desc:"A lightweight daily moisturizer for a soft, hydrated feel.",image:"https://via.placeholder.com/640x640/F7E6E8/81515C?text=Face+Moisturizer",flash:true,new:false},
{id:6,name:"Matte Finish Lipstick",category:"Cosmetics",price:390,oldPrice:520,discount:25,desc:"A richly coloured lipstick with a smooth matte finish.",image:"https://via.placeholder.com/640x640/F1D5D5/8A3947?text=Matte+Lipstick",flash:false,new:true},
{id:7,name:"Daily Glow Sunscreen",category:"Cosmetics",price:750,oldPrice:950,discount:21,desc:"Light-feel daily sun care for your outdoor routine.",image:"https://via.placeholder.com/640x640/F8E9C9/80622B?text=Daily+Sunscreen",flash:true,new:true},
{id:8,name:"Gentle Foaming Face Wash",category:"Cosmetics",price:480,oldPrice:590,discount:19,desc:"A gentle cleanser for a fresh, clean-feeling routine.",image:"https://via.placeholder.com/640x640/E1EBE8/3F655B?text=Face+Wash",flash:false,new:false},
{id:9,name:"Premium Basmati Rice 1kg",category:"Grocery",price:180,oldPrice:220,discount:18,desc:"Aromatic long-grain rice for special meals and everyday cooking.",image:"https://via.placeholder.com/640x640/F3EBD7/6B5A35?text=Basmati+Rice",flash:true,new:false},
{id:10,name:"Pure Honey 500g",category:"Grocery",price:420,oldPrice:500,discount:16,desc:"A pantry favourite with a naturally sweet taste.",image:"https://via.placeholder.com/640x640/F6E2B8/80531B?text=Pure+Honey",flash:false,new:true},
{id:11,name:"Roasted Mixed Nuts 250g",category:"Grocery",price:350,oldPrice:430,discount:19,desc:"A crunchy snack mix for sharing or enjoying on the go.",image:"https://via.placeholder.com/640x640/E9D8C2/76502D?text=Mixed+Nuts",flash:true,new:false},
{id:12,name:"Organic Green Tea  pack",category:"Grocery",price:260,oldPrice:320,discount:19,desc:"A soothing tea selection for your daily refreshment ritual.",image:"https://via.placeholder.com/640x640/DCE9D7/45613C?text=Green+Tea",flash:false,new:true}
];
// Restore locally uploaded product photos from this browser, if available.
const PRODUCT_IMAGE_STORAGE_KEY = "trendyShopProductImagesV1";
let savedProductImages = {};
try {
  savedProductImages = JSON.parse(localStorage.getItem(PRODUCT_IMAGE_STORAGE_KEY) || "{}");
} catch (error) {
  console.warn("Could not read saved product images:", error);
}
const defaultProductImages = Object.fromEntries(products.map(product => [product.id, product.image]));
products.forEach(product => {
  if (savedProductImages[product.id]) product.image = savedProductImages[product.id];
});

let cart = [];
let activeFilter = "all";
const money = n => "৳" + Number(n).toLocaleString("en-BD");
const getProduct = id => products.find(p=>p.id===Number(id));
function productCard(p){return `<article class="product-card"><div class="product-image" data-view="${p.id}" tabindex="0" role="button" aria-label="View ${p.name}"><img src="${p.image}" alt="${p.name} - Demo Product" loading="lazy"><span class="discount">-${p.discount}%</span><span class="demo-tag">DEMO PRODUCT</span></div><div class="product-info"><div class="product-category">${p.category}</div><h3>${p.name}</h3><p>${p.desc}</p><div class="price-row"><span class="price">${money(p.price)}</span><span class="old-price">${money(p.oldPrice)}</span></div><div class="card-actions"><button class="add-btn" data-add="${p.id}">＋ Add to cart</button><button class="view-btn" data-view="${p.id}" aria-label="View details">↗</button></div></div></article>`}
function renderGrid(target,items){document.getElementById(target).innerHTML=items.map(productCard).join("")}
function renderAll(){
 const query=document.getElementById("searchInput").value.trim().toLowerCase();
 const category=document.getElementById("searchCategory").value;
 const filtered=products.filter(p=>(activeFilter==="all"||p.category===activeFilter)&&(category==="all"||p.category===category)&&(!query||(p.name+" "+p.category+" "+p.desc).toLowerCase().includes(query)));
 renderGrid("featuredProducts",filtered);
 document.getElementById("noResults").hidden=filtered.length>0;
}
renderGrid("flashProducts",products.filter(p=>p.flash).slice(0,4));
renderAll();
renderGrid("newProducts",products.filter(p=>p.new).slice(0,4));
renderGrid("beautyProducts",products.filter(p=>p.category==="Cosmetics").slice(0,4));
renderGrid("groceryProducts",products.filter(p=>p.category==="Grocery").slice(0,4));
document.getElementById("year").textContent=new Date().getFullYear();

document.getElementById("filterBar").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;activeFilter=b.dataset.filter;document.querySelectorAll(".filter-chip").forEach(x=>x.classList.toggle("active",x===b));renderAll()});
document.getElementById("searchInput").addEventListener("input",renderAll);
document.getElementById("searchCategory").addEventListener("change",renderAll);
document.getElementById("searchButton").addEventListener("click",()=>{document.getElementById("featured").scrollIntoView({behavior:"smooth"});renderAll()});
document.querySelectorAll("[data-jump-filter]").forEach(a=>a.addEventListener("click",()=>{activeFilter=a.dataset.jumpFilter;document.querySelectorAll(".filter-chip").forEach(x=>x.classList.toggle("active",x.dataset.filter===activeFilter));renderAll()}));

function addToCart(id){const p=getProduct(id);if(!p)return;const item=cart.find(x=>x.id===p.id);if(item)item.qty++;else cart.push({...p,qty:1});updateCart();openCart()}
function getCartSubtotal(){return cart.reduce((sum,p)=>sum+p.price*p.qty,0)}
function getDeliveryCharge(){const area=document.getElementById("deliveryArea")?.value||"";return area==="inside"?80:area==="outside"?130:0}
function updateCartTotals(){
 const subtotal=getCartSubtotal(),delivery=getDeliveryCharge();
 const subtotalEl=document.getElementById("cartSubtotal");
 const deliveryEl=document.getElementById("deliveryCharge");
 const totalEl=document.getElementById("cartTotal");
 const hint=document.getElementById("deliveryHint");
 if(subtotalEl)subtotalEl.textContent=money(subtotal);
 if(deliveryEl)deliveryEl.textContent=money(delivery);
 if(totalEl)totalEl.textContent=money(subtotal+delivery);
 if(hint)hint.textContent=document.getElementById("deliveryArea")?.value?"Delivery charge included in total.":"Select your delivery area to calculate the total.";
}
function updateCart(){
 document.getElementById("cartCount").textContent=cart.reduce((s,p)=>s+p.qty,0);
 const el=document.getElementById("cartItems");
 if(!cart.length){el.innerHTML='<div class="empty-cart"><div>🛒</div><strong>Your cart is empty</strong><p>Add something lovely to get started.</p></div>';updateCartTotals();return}
 el.innerHTML=cart.map(p=>`<div class="cart-item"><img src="${p.image}" alt=""><div><h4>${p.name}</h4><small>${money(p.price)} each</small><div class="qty"><button data-qty="${p.id}" data-change="-1" aria-label="Decrease quantity">−</button><b>${p.qty}</b><button data-qty="${p.id}" data-change="1" aria-label="Increase quantity">＋</button></div></div><button class="remove" data-remove="${p.id}" aria-label="Remove ${p.name}">×</button></div>`).join("");
 updateCartTotals();
}
document.getElementById("deliveryArea")?.addEventListener("change",updateCartTotals);

document.addEventListener("click",e=>{const add=e.target.closest("[data-add]");if(add){addToCart(add.dataset.add);return}const view=e.target.closest("[data-view]");if(view){showProduct(view.dataset.view);return}const qty=e.target.closest("[data-qty]");if(qty){const p=cart.find(x=>x.id===Number(qty.dataset.qty));if(p){p.qty+=Number(qty.dataset.change);if(p.qty<=0)cart=cart.filter(x=>x.id!==p.id);updateCart()}return}const rem=e.target.closest("[data-remove]");if(rem){cart=cart.filter(x=>x.id!==Number(rem.dataset.remove));updateCart()}});
document.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.matches(".product-image[data-view]")){e.preventDefault();showProduct(e.target.dataset.view)}});
const overlay=document.getElementById("overlay"),drawer=document.getElementById("cartDrawer");
function openCart(){overlay.classList.add("show");drawer.classList.add("open");document.body.style.overflow="hidden"}
function closePanels(){overlay.classList.remove("show");drawer.classList.remove("open");document.body.style.overflow=""}
document.getElementById("cartOpen").addEventListener("click",openCart);document.getElementById("cartClose").addEventListener("click",closePanels);document.getElementById("continueShopping").addEventListener("click",closePanels);overlay.addEventListener("click",closePanels);
let activeGalleryIndex = 0;
function showProduct(id){
 const p=getProduct(id); if(!p)return;
 const imgs=(p.images&&p.images.length?p.images:[p.image]).filter(Boolean);
 activeGalleryIndex=0;
 document.getElementById("modalContent").innerHTML=`
 <div class="modal-image modal-gallery">
   <img id="customerGalleryMain" src="${imgs[0]}" alt="${p.name} photo 1 of ${imgs.length}">
   ${imgs.length>1?`<button class="gallery-arrow gallery-prev" type="button" data-gallery-step="-1" aria-label="Previous photo">‹</button><button class="gallery-arrow gallery-next" type="button" data-gallery-step="1" aria-label="Next photo">›</button><span class="gallery-count" id="customerGalleryCount">1 / ${imgs.length}</span>`:""}
   <div class="gallery-thumbs">${imgs.map((url,i)=>`<button type="button" class="gallery-thumb ${i===0?'active':''}" data-gallery-index="${i}" aria-label="Show photo ${i+1}"><img src="${url}" alt=""></button>`).join("")}</div>
 </div>
 <div class="modal-details"><span class="eyebrow">${p.category} · ${imgs.length} photo${imgs.length===1?'':'s'}</span><h2>${p.name}</h2><p>${p.desc}</p><div class="price-row"><span class="price">${money(p.price)}</span><span class="old-price">${money(p.oldPrice)}</span><span class="discount" style="position:static">-${p.discount}%</span></div><p style="margin-top:18px">Sample demo listing. Product availability, specifications and final price should be confirmed before purchase.</p><button class="btn btn-primary" style="width:100%;margin-top:15px" data-add="${p.id}" id="modalAdd">＋ Add to cart</button></div>`;
 document.getElementById("productModal").classList.add("show");document.body.style.overflow="hidden";
}
function setCustomerGallery(index){
 const p=getProduct(document.querySelector('#modalAdd')?.dataset.add); if(!p)return;
 const imgs=(p.images&&p.images.length?p.images:[p.image]).filter(Boolean);
 activeGalleryIndex=(index+imgs.length)%imgs.length;
 const main=document.getElementById("customerGalleryMain");
 if(main){main.src=imgs[activeGalleryIndex];main.alt=`${p.name} photo ${activeGalleryIndex+1} of ${imgs.length}`;}
 const count=document.getElementById("customerGalleryCount");if(count)count.textContent=`${activeGalleryIndex+1} / ${imgs.length}`;
 document.querySelectorAll(".gallery-thumb").forEach((b,i)=>b.classList.toggle("active",i===activeGalleryIndex));
}
document.getElementById("modalContent").addEventListener("click",e=>{
 const thumb=e.target.closest("[data-gallery-index]"); if(thumb){setCustomerGallery(Number(thumb.dataset.galleryIndex));return;}
 const step=e.target.closest("[data-gallery-step]"); if(step){setCustomerGallery(activeGalleryIndex+Number(step.dataset.galleryStep));}
});
function closeProduct(){document.getElementById("productModal").classList.remove("show");if(!drawer.classList.contains("open"))document.body.style.overflow=""}
document.getElementById("modalClose").addEventListener("click",closeProduct);
document.getElementById("productModal").addEventListener("click",e=>{if(e.target.id==="productModal")closeProduct()});
document.getElementById("modalContent").addEventListener("click",e=>{if(e.target.closest("#modalAdd")){closeProduct()}});
function openCheckout(){if(!cart.length){alert("Your cart is empty. Add a product first.");return}if(!document.getElementById("deliveryArea")?.value){alert("Please select your delivery area first.");document.getElementById("deliveryArea")?.focus();return}closePanels();document.getElementById("checkoutModal").classList.add("show");document.body.style.overflow="hidden"}
document.getElementById("checkoutButton").addEventListener("click",openCheckout);
document.getElementById("checkoutClose").addEventListener("click",()=>{document.getElementById("checkoutModal").classList.remove("show");document.body.style.overflow=""});
document.getElementById("checkoutModal").addEventListener("click",e=>{if(e.target.id==="checkoutModal"){e.currentTarget.classList.remove("show");document.body.style.overflow=""}});
document.getElementById("checkoutForm").addEventListener("submit",e=>{e.preventDefault();if(!cart.length)return;const area=document.getElementById("deliveryArea")?.value||"";if(!area){alert("Please select your delivery area in the cart.");document.getElementById("checkoutModal").classList.remove("show");document.body.style.overflow="";openCart();return}const name=document.getElementById("customerName").value.trim(),phone=document.getElementById("customerPhone").value.trim(),address=document.getElementById("customerAddress").value.trim();const list=cart.map(p=>`- ${p.name} × ${p.qty} — ${money(p.price*p.qty)}`).join("\\n");const subtotal=getCartSubtotal(),delivery=getDeliveryCharge(),total=subtotal+delivery;const areaLabel=area==="inside"?"Inside Dhaka":"Outside Dhaka";const message=`Hello Trendy-Shop,\\n\\nI want to place an order:\\n\\nProduct List:\\n${list}\\n\\nSubtotal: ${money(subtotal)}\\nDelivery Area: ${areaLabel}\\nDelivery Charge: ${money(delivery)}\\nTotal Cost: ${money(total)}\\n\\nCustomer Name: ${name}\\nMobile: ${phone}\\nDelivery Address: ${address}\\n\\nPlease confirm my order.`;window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank","noopener");document.getElementById("checkoutModal").classList.remove("show");document.body.style.overflow=""});
document.getElementById("whatsappHelp").addEventListener("click",()=>window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Trendy-Shop, I need some help.")}`,"_blank","noopener"));

document.querySelectorAll(".faq-q").forEach(q=>q.addEventListener("click",()=>{const item=q.parentElement;item.classList.toggle("open");q.querySelector("span").textContent=item.classList.contains("open")?"−":"＋"}));
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();alert("Thank you for subscribing! This demo form is not connected to a mailing service.");e.target.reset()});

let slideIndex=0;const slides=[...document.querySelectorAll(".slide")],dots=[...document.querySelectorAll(".dot")];
function setSlide(i){slideIndex=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle("active",n===slideIndex));dots.forEach((d,n)=>d.classList.toggle("active",n===slideIndex))}
document.getElementById("nextSlide").addEventListener("click",()=>setSlide(slideIndex+1));document.getElementById("prevSlide").addEventListener("click",()=>setSlide(slideIndex-1));dots.forEach((d,i)=>d.addEventListener("click",()=>setSlide(i)));
let slideTimer=setInterval(()=>setSlide(slideIndex+1),5500);document.querySelector(".hero-slider").addEventListener("mouseenter",()=>clearInterval(slideTimer));document.querySelector(".hero-slider").addEventListener("mouseleave",()=>slideTimer=setInterval(()=>setSlide(slideIndex+1),5500));
let remaining=8*3600+24*60+59;setInterval(()=>{remaining=remaining>0?remaining-1:8*3600+24*60+59;document.getElementById("hours").textContent=String(Math.floor(remaining/3600)).padStart(2,"0");document.getElementById("minutes").textContent=String(Math.floor(remaining%3600/60)).padStart(2,"0");document.getElementById("seconds").textContent=String(remaining%60).padStart(2,"0")},1000);

const mobileNav=document.getElementById("mobileNav");document.getElementById("menuToggle").addEventListener("click",()=>mobileNav.classList.add("open"));document.getElementById("menuClose").addEventListener("click",()=>mobileNav.classList.remove("open"));mobileNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>mobileNav.classList.remove("open")));
document.getElementById("mobileSearch").addEventListener("click",()=>{document.getElementById("siteHeader").classList.toggle("search-open");if(document.getElementById("siteHeader").classList.contains("search-open"))document.getElementById("searchInput").focus()});
updateCart();

// Shared cloud product image uploader (Supabase Storage + Postgres).
(function setupCloudProductImageUploader() {
  const productSelect = document.getElementById("imageProductSelect");
  const fileInput = document.getElementById("productImageFile");
  const preview = document.getElementById("productImagePreview");
  const galleryPreview = document.getElementById("productImageGallery");
  const saveButton = document.getElementById("saveProductImage");
  const resetButton = document.getElementById("resetProductImage");
  const status = document.getElementById("imageManagerStatus");
  const emailInput = document.getElementById("cloudAdminEmail");
  const passwordInput = document.getElementById("cloudAdminPassword");
  const signInButton = document.getElementById("cloudAdminSignIn");
  const signOutButton = document.getElementById("cloudAdminSignOut");
  const authStatus = document.getElementById("cloudAuthStatus");
  if (!productSelect || !fileInput || !preview || !saveButton || !resetButton || !status) return;

  let pendingFiles = [];
  let client = null;
  let isAdmin = false;
  const cloudConfig = window.TRENDY_CLOUD_CONFIG || {};
  const configured = Boolean(cloudConfig.supabaseUrl && cloudConfig.supabaseAnonKey && window.supabase?.createClient);

  products.forEach(product => {
    const option = document.createElement("option");
    option.value = String(product.id);
    option.textContent = product.name;
    productSelect.appendChild(option);
  });

  function selectedProduct() { return getProduct(productSelect.value); }
  function refreshProductViews() {
    renderAll();
    renderGrid("flashProducts", products.filter(p => p.flash).slice(0, 4));
    renderGrid("newProducts", products.filter(p => p.new).slice(0, 4));
    renderGrid("beautyProducts", products.filter(p => p.category === "Cosmetics").slice(0, 4));
    renderGrid("groceryProducts", products.filter(p => p.category === "Grocery").slice(0, 4));
    updateCart();
  }
  function showCurrentImage() {
    const product = selectedProduct();
    if (!product) return;
    const imgs = product.images && product.images.length ? product.images : [product.image];
    preview.src = imgs[0] || product.image;
    preview.alt = product.name + " image preview";
    if (galleryPreview) galleryPreview.innerHTML = imgs.map((url,i) => `<div class="admin-gallery-thumb"><img src="${url}" alt="${product.name} photo ${i+1}"><span>${i+1}</span></div>`).join("");
    pendingFiles = [];
    fileInput.value = "";
    saveButton.disabled = true;
    status.textContent = `${imgs.length} photo(s) currently saved for this product.`;
  }
  function compressImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Could not read this image file."));
      reader.onload = () => {
        const image = new Image();
        image.onerror = () => reject(new Error("This image could not be opened."));
        image.onload = () => {
          const scale = Math.min(1, 1400 / Math.max(image.width, image.height));
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(image.width * scale));
          canvas.height = Math.max(1, Math.round(image.height * scale));
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject(new Error("Image processing is not supported in this browser."));
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("Could not compress this image.")), "image/jpeg", 0.84);
        };
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }
  function updateAdminControls(session) {
    isAdmin = Boolean(session?.user);
    signInButton.hidden = isAdmin;
    signOutButton.hidden = !isAdmin;
    emailInput.disabled = isAdmin;
    passwordInput.disabled = isAdmin;
    saveButton.disabled = !isAdmin || !pendingFiles.length;
    authStatus.textContent = isAdmin ? `Signed in as ${session.user.email}. Cloud uploads are enabled.` : "Not signed in. Only the store admin can upload product images.";
  }

  if (!configured) {
    authStatus.textContent = "Cloud setup incomplete. Add Supabase URL and anon key in cloud-config.js, then run supabase-setup.sql.";
    signInButton.disabled = true;
    signOutButton.disabled = true;
    status.textContent = "Cloud image upload is not configured yet.";
  } else {
    client = window.supabase.createClient(cloudConfig.supabaseUrl, cloudConfig.supabaseAnonKey);
    client.auth.getSession().then(({ data, error }) => {
      if (error) authStatus.textContent = error.message;
      updateAdminControls(data?.session);
    });
    client.auth.onAuthStateChange((_event, session) => updateAdminControls(session));

    // Public visitors can read the shared product-image map; only authenticated admins can change it.
    client.from("product_images").select("product_id,image_url,sort_order").order("sort_order", { ascending: true }).then(({ data, error }) => {
      if (error) {
        console.error("Could not load shared product images:", error);
        status.textContent = "Could not load shared images. Check the Supabase table and public-read policy.";
        return;
      }
      (data || []).forEach(row => {
        const product = getProduct(row.product_id);
        if (product && row.image_url) {
          if (!product._hasCloudGallery) { product.images = []; product._hasCloudGallery = true; }
          product.images.push(row.image_url);
          product.image = product.images[0];
        }
      });
      refreshProductViews();
      showCurrentImage();
      status.textContent = "Shared product images loaded.";
    });

    signInButton.addEventListener("click", async () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      if (!email || !password) { authStatus.textContent = "Enter your admin email and password."; return; }
      signInButton.disabled = true;
      authStatus.textContent = "Signing in…";
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      signInButton.disabled = false;
      if (error) { authStatus.textContent = "Sign-in failed: " + error.message; return; }
      updateAdminControls(data.session);
      passwordInput.value = "";
    });
    signOutButton.addEventListener("click", async () => {
      const { error } = await client.auth.signOut();
      if (error) authStatus.textContent = "Sign-out failed: " + error.message;
      else { updateAdminControls(null); authStatus.textContent = "Signed out."; }
    });
  }

  productSelect.addEventListener("change", showCurrentImage);
  fileInput.addEventListener("change", async () => {
    const files = Array.from(fileInput.files || []);
    if (!files.length) return;
    const invalid = files.find(file => !/^image\/(jpeg|png|webp)$/.test(file.type));
    if (invalid) { status.textContent = "Please choose only JPG, PNG or WebP images."; fileInput.value = ""; return; }
    const tooLarge = files.find(file => file.size > 12 * 1024 * 1024);
    if (tooLarge) { status.textContent = "Each image must be under 12 MB."; fileInput.value = ""; return; }
    status.textContent = `Preparing ${files.length} image(s)…`;
    try {
      pendingFiles = await Promise.all(files.map(compressImage));
      preview.src = URL.createObjectURL(pendingFiles[0]);
      saveButton.disabled = !isAdmin;
      status.textContent = isAdmin ? `${pendingFiles.length} photo(s) ready. Click Upload images to cloud.` : "Photos ready. Sign in as the store admin to upload them.";
    } catch (error) {
      pendingFiles = [];
      saveButton.disabled = true;
      status.textContent = error.message || "Could not prepare the selected images.";
    }
  });

  saveButton.addEventListener("click", async () => {
    const product = selectedProduct();
    if (!client || !isAdmin || !product || !pendingFiles.length) return;
    saveButton.disabled = true;
    status.textContent = `Uploading ${pendingFiles.length} photo(s) to cloud…`;
    const uploadedUrls = [];
    for (let i = 0; i < pendingFiles.length; i++) {
      const path = `products/${product.id}/${Date.now()}-${i}.jpg`;
      const { error: uploadError } = await client.storage.from("product-images").upload(path, pendingFiles[i], { contentType: "image/jpeg", cacheControl: "3600", upsert: false });
      if (uploadError) { status.textContent = "Upload failed: " + uploadError.message; saveButton.disabled = false; return; }
      uploadedUrls.push(client.storage.from("product-images").getPublicUrl(path).data.publicUrl);
    }
    const { error: saveError } = await client.from("product_images").insert(uploadedUrls.map((image_url, sort_order) => ({ product_id: product.id, image_url, sort_order, updated_at: new Date().toISOString() })));
    if (saveError) { status.textContent = "Photos uploaded, but gallery could not be saved: " + saveError.message + ". Run the updated SQL setup file."; saveButton.disabled = false; return; }
    product.images = [...(product.images || [product.image]), ...uploadedUrls];
    product.image = product.images[0];
    pendingFiles = [];
    fileInput.value = "";
    refreshProductViews();
    showCurrentImage();
    status.textContent = `Success! ${uploadedUrls.length} photo(s) added. Customers can open the product to view the full gallery.`;
  });

  resetButton.addEventListener("click", async () => {
    const product = selectedProduct();
    if (!product) return;
    if (!client || !isAdmin) { status.textContent = "Sign in as the store admin to restore the shared default image."; return; }
    resetButton.disabled = true;
    const { error } = await client.from("product_images").delete().eq("product_id", product.id);
    resetButton.disabled = false;
    if (error) { status.textContent = "Could not restore default image: " + error.message; return; }
    product.image = defaultProductImages[product.id];
    product.images = [product.image];
    showCurrentImage();
    refreshProductViews();
    status.textContent = "Default image restored for all visitors.";
  });

  showCurrentImage();
})();
